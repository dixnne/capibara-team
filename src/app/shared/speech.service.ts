import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  synthesis ?: SpeechSynthesis;

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis;
    }
  }

  start(text: string, rate = 1) {

    if(this.synthesis === undefined) {
      console.log("window.speechSynthesis is undefined");
      return;
    }

    const textToSpeech = new SpeechSynthesisUtterance(text);
    textToSpeech.lang = "en-US";
    textToSpeech.text = text;
    textToSpeech.rate = rate;

    const voice = speechSynthesis.getVoices().filter((voice) => {
      return voice.name === "Google US English";
    })[0];
    textToSpeech.voice = voice;
    
    this.synthesis?.cancel();
    this.synthesis?.speak(textToSpeech);
  }

  pause() {
    this.synthesis?.pause();
  }

  resume() {
    this.synthesis?.resume();
  }

  cancel() {
    this.synthesis?.cancel();
  }
}
