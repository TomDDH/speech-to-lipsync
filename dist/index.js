"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SpeechToLipsync: () => SpeechToLipsync
});
module.exports = __toCommonJS(index_exports);

// src/SpeechToLipsync.ts
var import_meyda = __toESM(require("meyda"));
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
    this.analyzer = import_meyda.default.createMeydaAnalyzer({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpeechToLipsync
});
