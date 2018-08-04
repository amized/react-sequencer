import {
  STATUS_IDLE,
  STATUS_PLAYING,
  STATUS_COMPLETE
} from './constants';

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

  _onLoop = (now) => {
    const currentStep = this._getStep(this.currentStep);
    const currentTimeIn = this.currentTimeIn = now - this.startedAt;
    const completesAt = currentStep.endPos;

    if (currentTimeIn >= completesAt) {
      if (this.currentStep === this.steps.length - 1) {
        if (this.loop) {
          this.currentStep = 0;
          this.currentTimeIn = 0;
          this.startedAt = now;
        } else {
          this.status = STATUS_COMPLETE;
        }
      } else {
        this.currentStep++;
      }
      this._notifyChange();
    }
  }

  _notifyChange() {
    const state = this.getState();

    this.subscriptions.forEach(fn => { fn(state); });
  }

  onChange = (fn) => {
    this.subscriptions.push(fn);
  }

  play = (now) => {
    if (this.status === STATUS_PLAYING) {
      return;
    }
    if (this.isComplete()) {
      this.currentStep = 0;
      this.currentTimeIn = 0;
    }
    this.startedAt = now - this.currentTimeIn;
    this.status = STATUS_PLAYING;
    this._notifyChange();
  }

  pause = () => {
    if (this.status !== STATUS_IDLE) {
      this.status = STATUS_IDLE;
      this._notifyChange();
    }
  }

  stop = () => {
    if (this.status !== STATUS_IDLE) {
      this.currentStep = 0;
      this.currentTimeIn = 0;
      this.status = STATUS_IDLE;
      this._notifyChange();
    }
  }

  complete = () => {
    if (this.status !== STATUS_COMPLETE) {
      this.currentStep = this.steps.length - 1;
      this.status = STATUS_COMPLETE;
      this._notifyChange();
    }
  }

  isComplete = () => {
    return this.status === STATUS_COMPLETE;
  }

  isPlaying = () => {
    return this.status === STATUS_PLAYING;
  }

  getState = () => {
    const state = {
      current: this.steps[this.currentStep].name,
      index: this.currentStep,
      isPlaying: this.isPlaying(),
      isComplete: this.isComplete()
    };

    return state;
  }
}

export default Sequencer;
