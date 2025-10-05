
import React, { useState, useRef, useEffect, useCallback } from 'react';
// FIX: Removed unused and non-exported `LiveSession` type.
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { CloseIcon, MicrophoneIcon, StopIcon, LoaderIcon, ChatBubbleIcon } from './icons';

// --- Audio Encoding/Decoding Helpers ---

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Component ---

interface TranscriptItem {
    speaker: 'user' | 'model';
    text: string;
    isFinal: boolean;
}

interface LiveChatProps {
  onClose: () => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const LiveChat: React.FC<LiveChatProps> = ({ onClose }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
    
    // FIX: Use `ReturnType` to infer session promise type as `LiveSession` is not exported.
    const sessionPromiseRef = useRef<ReturnType<typeof ai.live.connect> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef<number>(0);
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(scrollToBottom, [transcript]);

    const stopSession = useCallback(async () => {
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (e) {
                console.error("Error closing session:", e);
            }
            sessionPromiseRef.current = null;
        }

        streamRef.current?.getTracks().forEach(track => track.stop());
        scriptProcessorRef.current?.disconnect();
        mediaStreamSourceRef.current?.disconnect();
        inputAudioContextRef.current?.close();

        setIsConnected(false);
        setIsConnecting(false);
    }, []);
    
    useEffect(() => {
        return () => {
            stopSession();
        };
    }, [stopSession]);
    
    const startSession = async () => {
        setError(null);
        setIsConnecting(true);
        setTranscript([]);

        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {
            console.error(e);
            setError("Microphone access denied. Please allow microphone access in your browser settings.");
            setIsConnecting(false);
            return;
        }

        // FIX: Cast `window` to `any` to support vendor-prefixed `webkitAudioContext` for older browsers.
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        // FIX: Cast `window` to `any` to support vendor-prefixed `webkitAudioContext` for older browsers.
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        sessionPromiseRef.current = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    setIsConnecting(false);
                    setIsConnected(true);
                    
                    if (!streamRef.current || !inputAudioContextRef.current) return;

                    mediaStreamSourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
                    scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                    
                    scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        if (sessionPromiseRef.current) {
                            sessionPromiseRef.current.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        }
                    };

                    mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                    scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    // FIX: Refactored transcription handling as `isFinal` property is deprecated.
                    // Use `turnComplete` to determine when a transcript item is final.
                    // Handle Transcription
                    if (message.serverContent?.inputTranscription) {
                        const text = message.serverContent.inputTranscription.text;
                        setTranscript(prev => {
                            const last = prev[prev.length - 1];
                            if (last?.speaker === 'user' && !last.isFinal) {
                                return [...prev.slice(0, -1), { speaker: 'user', text, isFinal: false }];
                            }
                            return [...prev, { speaker: 'user', text, isFinal: false }];
                        });
                    }
                    if (message.serverContent?.outputTranscription) {
                        const text = message.serverContent.outputTranscription.text;
                        setTranscript(prev => {
                            const last = prev[prev.length - 1];
                            if (last?.speaker === 'model' && !last.isFinal) {
                                return [...prev.slice(0, -1), { speaker: 'model', text, isFinal: false }];
                            }
                            return [...prev, { speaker: 'model', text, isFinal: false }];
                        });
                    }

                    if (message.serverContent?.turnComplete) {
                        setTranscript(prev => prev.map(item => item.isFinal ? item : { ...item, isFinal: true }));
                    }

                    // Handle Audio Playback
                    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                    if (base64Audio && outputAudioContextRef.current) {
                        const outputCtx = outputAudioContextRef.current;
                        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                        const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
                        
                        const source = outputCtx.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(outputCtx.destination);
                        
                        source.addEventListener('ended', () => {
                            outputSourcesRef.current.delete(source);
                        });

                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current += audioBuffer.duration;
                        outputSourcesRef.current.add(source);
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error("Session error:", e);
                    setError("A connection error occurred. Please try again.");
                    stopSession();
                },
                onclose: (e: CloseEvent) => {
                    stopSession();
                },
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                },
                systemInstruction: 'You are a friendly and engaging news buddy for kids. You can discuss the news articles in this app, answer questions about them, or have a fun chat about today\'s world. Keep your language simple and your tone encouraging.',
                inputAudioTranscription: {},
                outputAudioTranscription: {},
            },
        });
    };

    const getButtonState = () => {
        if (isConnecting) {
            return {
                text: "Connecting...",
                icon: <LoaderIcon className="h-6 w-6 animate-spin" />,
                action: () => {},
                disabled: true,
                className: "bg-yellow-500",
            };
        }
        if (isConnected) {
            return {
                text: "Stop Chat",
                icon: <StopIcon className="h-6 w-6" />,
                action: stopSession,
                disabled: false,
                className: "bg-red-500 hover:bg-red-600",
            };
        }
        return {
            text: "Start Chat",
            icon: <MicrophoneIcon className="h-6 w-6" />,
            action: startSession,
            disabled: false,
            className: "bg-green-500 hover:bg-green-600",
        };
    };

    const buttonState = getButtonState();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg h-[70vh] max-h-[700px] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <header className="p-4 border-b flex justify-between items-center bg-slate-50">
                <div className="flex items-center space-x-3">
                    <ChatBubbleIcon className="h-8 w-8 text-blue-600"/>
                    <h2 className="text-xl font-extrabold text-slate-900">Live News Buddy</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                    <CloseIcon className="h-6 w-6 text-slate-500" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100">
                {transcript.length === 0 && !isConnecting && (
                    <div className="text-center text-slate-500 pt-16">
                        <p>Press "Start Chat" to talk with your News Buddy!</p>
                    </div>
                )}
                {transcript.map((item, index) => (
                    <div key={index} className={`flex ${item.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${item.speaker === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                            <p className="text-sm sm:text-base">{item.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={transcriptEndRef} />
            </div>

            {error && <div className="p-3 bg-red-100 text-red-700 text-sm text-center">{error}</div>}
            
            <footer className="p-4 border-t bg-slate-50">
                 <button
                    onClick={buttonState.action}
                    disabled={buttonState.disabled}
                    className={`w-full flex items-center justify-center p-4 rounded-xl text-white font-bold text-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-wait ${buttonState.className}`}
                >
                    {buttonState.icon}
                    <span className="ml-3">{buttonState.text}</span>
                </button>
            </footer>
        </div>
    </div>
  );
};

export default LiveChat;
