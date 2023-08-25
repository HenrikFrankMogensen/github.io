class SoundPlayer extends Game {
  constructor(audioContext, soundFilePath) {
    super();
    this.audioContext = audioContext;
    this.soundBuffer = null;
    this.soundFilePath = soundFilePath;
    this.noTimeLimit = false;
    this.source = {};
  }

  async loadSound() {
    const response = await fetch(this.soundFilePath);
    const audioData = await response.arrayBuffer();
    this.soundBuffer = await this.audioContext.decodeAudioData(audioData);
  }

  play(loop = false) {
    if (this.soundBuffer) {
      this.source = this.audioContext.createBufferSource();
      this.source.buffer = this.soundBuffer;
      this.source.connect(this.audioContext.destination);
      this.source.loop = loop;
      this.source.start();
    }
  }
  stop() {
    this.source.stop();
  }
}
