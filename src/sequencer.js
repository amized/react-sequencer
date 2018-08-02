import {
  STATUS_IDLE,
  STATUS_PLAYING,
  STATUS_COMPLETE
} from './constants';

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

class Sequencer {
  constructor(props) {
    const defaults = {
      steps: [],
      loop: false,
      complete: false
    };
    const options = Object.assign(defaults, props);
    this.steps = this._generateSteps(options.steps);
    this.currentStep = 0;
    this.currentTimeIn = 0;
    this.timeIntoStep = 0;
    this.loop = options.loop;
    this.status = STATUS_IDLE;
    this.requestID = null;
    this.subscriptions = [];

    if (options.complete === true) {
      this.complete();
    }
  }

  _generateSteps(stepsInput) {
    if (!stepsInput || !Array.isArray(stepsInput)) {
      throw new Error('Invalid format.');
    }

    let prev = 0;

    const steps = stepsInput.map(step => {
      if (
        !Array.isArray(step) ||
        step.length !== 2 ||
        (typeof step[0] !== 'string' && typeof step[1] !== 'number')
      ) {
        throw new Error('Invalid format. See docs for correct structure.');
      }

      const startPos = prev;
      const endPos = step[1] + prev;
      prev = endPos;
      return {
        startPos,
        endPos,
        name: step[0]
      };
    });

    return steps;
  }

  _getStep(stepId) {
    return this.steps[stepId];
  }

  _onLoop = () => {
    if (this.status !== STATUS_PLAYING) {
      return;
    }
    const currentStep = this._getStep(this.currentStep);
    const now = Date.now();
    const currentTimeIn = this.currentTimeIn = now - this.startedAt;
    const completesAt = currentStep.endPos;
    this.timeIntoStep = currentTimeIn - currentStep.startPos;

    if (currentTimeIn >= completesAt) {
      if (this.currentStep === this.steps.length - 1) {
        if (this.loop) {
          this.currentStep = 0;
          this.currentTimeIn = 0;
          this.startedAt = Date.now();
        } else {
          this.status = STATUS_COMPLETE;
        }
      } else {
        this.currentStep++;
      }
      this._notifyChange();
    }
    this.requestID = onNextTick(this._onLoop);
  }

  _notifyChange() {
    const state = this.getState();

    this.subscriptions.forEach(fn => { fn(state); });
  }

  onChange(fn) {
    this.subscriptions.push(fn);
  }

  play = () => {
    if (this.status === STATUS_PLAYING) {
      return;
    }
    if (this.isComplete()) {
      this.currentStep = 0;
      this.currentTimeIn = 0;
    }
    this.startedAt = Date.now() - this.currentTimeIn;
    this.status = STATUS_PLAYING;
    this._notifyChange();

    this.requestID = onNextTick(this._onLoop);
  }

  pause = () => {
    if (this.status !== STATUS_IDLE) {
      this.status = STATUS_IDLE;
      cancelNextTick(this.requestID);
      this._notifyChange();
    }
  }

  stop = () => {
    if (this.status !== STATUS_IDLE) {
      this.currentStep = 0;
      this.currentTimeIn = 0;
      this.status = STATUS_IDLE;
      cancelNextTick(this.requestID);
      this._notifyChange();
    }
  }

  complete = () => {
    if (this.status !== STATUS_COMPLETE) {
      this.currentStep = this.steps.length - 1;
      this.status = STATUS_COMPLETE;
      cancelNextTick(this.requestID);
      this._notifyChange();
    }
  }

  isComplete = () => {
    return this.status === STATUS_COMPLETE;
  }

  isPlaying = () => {
    return this.status === STATUS_PLAYING;
  }

  getState() {
    const state = {
      current: this.steps[this.currentStep].name,
      index: this.currentStep,
      isPlaying: this.isPlaying(),
      isComplete: this.isComplete(),
      play: this.play,
      stop: this.stop,
      pause: this.pause,
      complete: this.complete
    };

    return state;
  }
}

export default Sequencer;
