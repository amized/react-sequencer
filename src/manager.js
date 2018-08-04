import Sequencer from './sequencer';

let onNextTick, cancelNextTick;

if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
  onNextTick = window.requestAnimationFrame;
  cancelNextTick = window.cancelAnimationFrame;
} else if (typeof setTimeout === 'function') {
  onNextTick = func => setTimeout(func, 1);
  cancelNextTick = clearTimeout;
} else {
  throw new Error(
    'React sequencer depends on requestAnimationFrame, please use a polyfill if not available in the browser.'
  );
}

class Manager {
  constructor() {
    this.keys = 0;
    this.sequencers = {};
    this.now = Date.now();
    this.isLooping = false;
  }

  createSequencer(options) {
    const seq = new Sequencer(options);
    const key = this.getNewKey();
    this.sequencers[key] = seq;
    const api = {
      play: () => { this.play(seq); },
      complete: seq.complete,
      stop: seq.stop,
      pause: seq.pause,
      onChange: seq.onChange,
      getState: seq.getState
    };
    return api;
  }

  getNewKey() {
    return this.keys++;
  }

  play(seq) {
    this.startLoop();
    seq.play(this.now);
  }

  startLoop = () => {
    if (!this.isLooping) {
      this.isLooping = true;
      this.now = Date.now();
      this.requestID = onNextTick(this._onLoop);
    }
  }

  stopLoop = () => {
    if (this.isLooping) {
      this.isLooping = false;
      cancelNextTick(this.requestID);
    }
  }

  _onLoop = () => {
    this.now = Date.now();
    let continueLoop = false;
    for (let key in this.sequencers) {
      const seq = this.sequencers[key];
      if (seq.isPlaying()) {
        seq._onLoop(this.now);
        continueLoop = true;
      }
    }

    if (continueLoop) {
      this.requestID = onNextTick(this._onLoop);
    } else {
      this.stopLoop();
    }
  }
}

const manager = new Manager();

export default manager;
