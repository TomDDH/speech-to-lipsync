import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';
import { MeydaFeaturesObject } from 'meyda';

type SpeechToLipsyncProps = {
    amount?: number;
};

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}
declare class SpeechToLipsync {
    private amount;
    private speech;
    onUpdate?: (data: {
        jaw: number;
        oo: number;
        ee: number;
    }) => void;
    audioContext: AudioContext;
    analyzer: MeydaAnalyzer;
    private buffer;
    constructor({ amount }: SpeechToLipsyncProps);
    callback(features: MeydaFeaturesObject['mfcc']): void;
    setSource(buffer: AudioBuffer): void;
    play(): void;
    replay(): void;
    stop(): void;
}

export { SpeechToLipsync, type SpeechToLipsyncProps };
