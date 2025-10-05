
import React from 'react';

// Props for all icons
interface IconProps {
    className?: string;
}

export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.1 0-2-.9-2-2v-1c0-.55.45-1 1-1s1 .45 1 1v1h8v-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2z"/>
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const PictureIcon: React.FC<IconProps> = ({ className }) => (
     <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.995a10.875 10.875 0 011.08.057l.03.003c.574.066 1.056.54 1.109 1.116l.092.603a11.103 11.103 0 01-1.318 4.082c-.22.428-.468.85-.743 1.253l-.27.4c-.29.423-.604.823-.94 1.198a13.386 13.386 0 01-2.036 1.83c-.933.68-1.95.99-2.998.995c-.328.006-.653-.025-.972-.084a12.44 12.44 0 01-2.02-1.028c-.4-.25-.77-.54-1.1-.872c-.326-.328-.62-.682-.88-1.062c-.255-.375-.472-.774-.648-1.192c-.173-.41-.31-.83-.404-1.258a12.02 12.02 0 01-.41-2.82c.01-.63.29-1.21.75-1.613a1.14 1.14 0 011.613.75c.01.12.02.24.03.359c.04.34.1.68.18.994c.09.348.2.686.35.998c.15.31.32.593.52.84c.2.24.42.45.67.618c.25.166.52.292.82.378c.3.085.62.12.94.108c.32-.012.63-.075.92-.188c.29-.112.56-.27.8-.468c.23-.19.44-.41.62-.658c.18-.24.32-.5.44-.766c.12-.26.2-.53.26-.81c.06-.27.08-.55.08-.83a7.66 7.66 0 00-.27-2.14c-.16-.48-.36-.93-.6-1.34c-.24-.4-.5-.78-.8-1.12c-.3-.34-.62-.65-.96-.93c-.34-.27-.7-.5-1.07-.68c-.37-.17-.74-.3-1.13-.38c-.39-.07-.78-.1-1.17-.08c-.5.02-1 .2-1.4.52c-.4.32-.7.73-.85 1.22c-.15.48-.15.98-.02 1.45c.13.47.4.88.78 1.2c.38.32.84.53 1.33.6c.5.07 1-.02 1.45-.23c.45-.2.83-.5 1.12-.88c.29-.38.48-.82.58-1.3c.1-.48.1-.98-.04-1.45c-.14-.47-.4-.88-.78-1.2c-.38-.32-.83-.52-1.33-.6c-.5-.07-1 .02-1.45.23c-.45-.2-.83-.5-1.12-.88c-.29-.38-.48-.82-.58-1.3a1.14 1.14 0 011.613-.75zM12.056 3.328a1.14 1.14 0 01-1.613-.75c-.01-.12-.02-.24-.03-.359c-.04-.34-.1-.68-.18-.994c-.09-.348-.2-.686-.35-.998c-.15-.31-.32-.593-.52-.84c-.2-.24-.42-.45-.67-.618c-.25-.166-.52-.292-.82-.378c-.3-.085-.62-.12-.94-.108c-.32.012-.63.075-.92.188c-.29.112-.56-.27-.8.468c-.23.19-.44-.41-.62-.658c-.18-.24-.32-.5-.44-.766c-.12-.26-.2.53-.26-.81c-.06.27-.08.55-.08.83a7.66 7.66 0 00.27 2.14c.16.48.36.93.6 1.34c.24.4.5.78.8 1.12c.3.34.62.65.96.93c.34.27.7.5 1.07.68c.37.17.74.3 1.13.38c.39.07.78.1 1.17.08c.5-.02 1-.2 1.4-.52c.4-.32.7-.73.85-1.22c.15-.48.15-.98.02-1.45c-.13-.47-.4-.88-.78-1.2c-.38-.32-.84-.53-1.33-.6c-.5-.07-1 .02-1.45-.23c-.45-.2-.83-.5-1.12-.88c-.29-.38-.48-.82-.58-1.3c-.1-.48-.1-.98.04-1.45c.14-.47.4-.88.78-1.2c.38-.32.83-.52-1.33-.6c.5-.07 1 .02 1.45.23c.45.2.83.5 1.12.88c.29.38.48.82.58-1.3a1.14 1.14 0 011.613-.75z" />
    </svg>
);


export const PlayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

export const StopIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 6h12v12H6z" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export const LoaderIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5m11 2a8.963 8.963 0 01-16 0c0-4.962 4.037-9 9-9s9 4.038 9 9-4.037 9-9 9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3-3m0 0l-3 3m3-3v12" />
        <path d="M4 4v5h5M20 20v-5h-5M4 4a14.95 14.95 0 0114.65 12.15M20 20a14.95 14.95 0 01-14.65-12.15" />
    </svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 0 0-12 0v1.5a6 6 0 0 0 6 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-1.5a7.5 7.5 0 0 0-15 0v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 .75.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 0 0-6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a2.25 2.25 0 0 0 2.25-2.25v-1.5a2.25 2.25 0 0 0-4.5 0v1.5A2.25 2.25 0 0 0 12 21Z" />
    </svg>
);
