import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext = new AudioContext();
  private audioBuffer: AudioBuffer | null = null;
  private source: AudioBufferSourceNode | null = null;
  private isPlaying = false;
  private currentPath: string = '';

  async loadAndToggle(path: string) {
    if (this.currentPath !== path) {
      this.audioBuffer = null;
      this.currentPath = path;
    }

    if (!this.audioBuffer) {
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  private play() {
    if (!this.audioBuffer) return;
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.connect(this.audioContext.destination);
    this.source.start();
    this.isPlaying = true;
  }

  stop() {
    this.source?.stop();
    this.isPlaying = false;
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}
