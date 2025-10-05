
import React, { useState, useMemo } from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { PlayIcon, PauseIcon, StopIcon, CogIcon } from './icons';

interface AudioPlayerProps {
  textToRead: string;
  lang: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ textToRead, lang }) => {
  const { speak, pause, resume, stop, isSpeaking, isPaused, supported, voices } = useSpeechSynthesis();
  
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>(undefined);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const languageVoices = useMemo(() => {
    const baseLang = lang.split('-')[0];
    return voices
      .filter(voice => voice.lang.startsWith(baseLang))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [voices, lang]);
  
  const selectedVoice = useMemo(() => {
    return voices.find(v => v.voiceURI === selectedVoiceURI) || null;
  }, [voices, selectedVoiceURI]);

  if (!supported) {
    return <div className="mt-4 text-sm text-red-500">Sorry, your browser does not support text-to-speech.</div>;
  }
  
  const handlePlayPause = () => {
    if (isSpeaking) {
        if(isPaused) {
            resume();
        } else {
            pause();
        }
    } else {
        const voiceToUse = selectedVoice || languageVoices[0] || null;
        speak(textToRead, lang, voiceToUse, rate, pitch);
    }
  }

  return (
    <div className="mt-4 bg-slate-200/60 p-3 rounded-xl">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={isSpeaking && !isPaused ? "Pause narration" : "Play narration"}
          >
            {isSpeaking && !isPaused ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
          </button>
          <button 
            onClick={stop}
            disabled={!isSpeaking}
            className="p-3 rounded-full bg-slate-500 text-white hover:bg-slate-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            aria-label="Stop narration"
          >
            <StopIcon className="h-6 w-6" />
          </button>
           <div className="flex-1 text-sm font-semibold text-slate-600">
            {isSpeaking && !isPaused && "Playing..."}
            {isPaused && "Paused"}
            {!isSpeaking && "Listen to the story"}
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className="p-3 rounded-full hover:bg-slate-300/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            aria-label="Audio settings"
            aria-expanded={showSettings}
          >
              <CogIcon className="h-6 w-6 text-slate-600"/>
          </button>
        </div>
        {showSettings && (
            <div className="mt-4 pt-4 border-t border-slate-300/80 space-y-4">
                <div>
                    <label htmlFor="voice-select" className="block text-sm font-medium text-slate-700 mb-1">Voice</label>
                    <select id="voice-select" value={selectedVoiceURI} onChange={(e) => setSelectedVoiceURI(e.target.value)} className="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                        {languageVoices.length > 0 ? languageVoices.map(voice => (
                            <option key={voice.voiceURI} value={voice.voiceURI}>
                                {voice.name} ({voice.lang})
                            </option>
                        )) : <option disabled>No voices available for this language</option>}
                    </select>
                </div>
                <div>
                    <label htmlFor="rate-slider" className="block text-sm font-medium text-slate-700 mb-1">Speed: {rate.toFixed(1)}x</label>
                    <input id="rate-slider" type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label htmlFor="pitch-slider" className="block text-sm font-medium text-slate-700 mb-1">Pitch: {pitch.toFixed(1)}</label>
                    <input id="pitch-slider" type="range" min="0" max="2" step="0.1" value={pitch} onChange={e => setPitch(parseFloat(e.target.value))} className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>
        )}
    </div>
  );
};

export default AudioPlayer;
