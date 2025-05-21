// src/SpeechToLipsync.ts
import Meyda from "meyda";
var SpeechToLipsync = class {
  amount;
  speech;
  onUpdate;
  audioContext;
  analyzer;
  buffer;
  constructor({ amount = 1 }) {
    this.amount = amount;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate, this.audioContext.sampleRate);
    this.speech = this.audioContext.createBufferSource();
    this.speech.buffer = this.buffer;
    this.speech.connect(this.audioContext.destination);
    this.analyzer = Meyda.createMeydaAnalyzer({
      audioContext: this.audioContext,
      source: this.speech,
      bufferSize: 512,
      //256,512
      featureExtractors: ["mfcc"],
      callback: (features) => {
        this.callback(features.mfcc);
      }
    });
  }
  callback(features) {
    const jaw = features[1] * 0.01 * this.amount;
    const oo = Math.pow(2, features[4] * features[7] / 10) * 0.1 * this.amount;
    const ee = Math.max(features[4], 0, 1) * 0.2 * this.amount;
    if (this.onUpdate) {
      this.onUpdate({ jaw, oo, ee });
    }
  }
  setSource(buffer) {
    if (this.speech && this.audioContext.currentTime) {
      this.speech.stop();
    }
    this.analyzer.stop();
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    this.buffer = buffer;
    source.connect(this.audioContext.destination);
    this.speech = source;
    this.analyzer.setSource(source);
    this.analyzer.start();
  }
  play() {
    if (this.speech && !this.audioContext.currentTime) {
      this.speech.start();
    }
  }
  replay() {
    if (this.speech && this.audioContext.currentTime) {
      this.speech.stop();
    }
    this.analyzer.stop();
    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.audioContext.destination);
    this.speech = source;
    this.analyzer.setSource(source);
    this.analyzer.start();
    this.speech.start();
  }
  stop() {
    if (this.speech) {
      this.speech.stop();
    }
  }
};
export {
  SpeechToLipsync
};
