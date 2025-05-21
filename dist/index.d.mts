import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';
import { MeydaFeaturesObject } from 'meyda';

type SpeechToLipsyncProps = {
    intensity?: number;
};

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}
declare class SpeechToLipsync {
    private intensity;
    private speech;
    onUpdate?: (data: {
        jaw: number;
        oo: number;
        ee: number;
    }) => void;
    audioContext: AudioContext;
    analyzer: MeydaAnalyzer;
    private buffer;
    constructor({ intensity }: SpeechToLipsyncProps);
    callback(features: MeydaFeaturesObject['mfcc']): void;
    setSource(buffer: AudioBuffer): void;
    play(): void;
    replay(): void;
    stop(): void;
}

export { SpeechToLipsync, type SpeechToLipsyncProps };
