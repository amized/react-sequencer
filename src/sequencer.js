const STATUS_IDLE = 'sequencer/STATUS_IDLE';
const STATUS_PLAYING = 'sequencer/STATUS_PLAYING';
const STATUS_COMPLETE = 'sequencer/STATUS_COMPLETE';

class Sequencer {

  constructor(props) {

    const defaults = {
      steps: [],
      loop: false
    };

    const options = Object.assign(defaults, props);

    this.steps = this.generateSteps(options.steps);
    if (this.steps === null) {
      throw new Error('Invalid input to Sequencer, see docs for correct format.');
    }

    this.loop = options.loop;
    this.currentStep = 0;
    this.currentTimeIn = 0;
    this.status = STATUS_IDLE;
    this.requestID = null;
    this.subscriptions = [];
  }

  generateSteps(stepsInput) {

    if (!stepsInput || typeof stepsInput !== 'object') {
      return null;
    }

    let prev = 0;

    const steps = stepsInput.map(step => {
      const position = step[1] + prev;

      prev = position;
      return {
        position,
        name: step[0]
      };
    });

    return steps;
  }

  getCurrentStepName() {
    return this.steps[this.currentStep].name;
  }

  getStep(stepId) {
    return this.steps[stepId];
  }

  onLoop = () => {
    if (this.status !== STATUS_PLAYING) {
      return;
    }
    const currentStep = this.getStep(this.currentStep);
    const now = Date.now();
    const currentTimeIn = this.currentTimeIn = now - this.startedAt;
    const completesAt = currentStep.position;

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
      this.notifyChange();
    }
    this.requestID = window.requestAnimationFrame(this.onLoop);
  }

  notifyChange() {
    const state = this.getState();

    this.subscriptions.forEach(fn => { fn(state); });
  }

  onChange(fn) {
    this.subscriptions.push(fn);
  }

  start = () => {
    if (this.status === STATUS_PLAYING) {
      return;
    }
    if (this.isComplete()) {
      this.currentStep = 0;
      this.currentTimeIn = 0;
    }
    this.startedAt = Date.now() - this.currentTimeIn;
    this.status = STATUS_PLAYING;
    this.notifyChange();
    this.requestID = window.requestAnimationFrame(this.onLoop);
  }

  pause = () => {
    if (this.status !== STATUS_IDLE) {
      this.status = STATUS_IDLE;
      window.cancelAnimationFrame(this.requestID);
      this.notifyChange();
    }
  }

  stop = () => {
    if (this.status !== STATUS_IDLE) {
      this.currentStep = 0;
      this.currentTimeIn = 0;
      this.status = STATUS_IDLE;
      window.cancelAnimationFrame(this.requestID);
      this.notifyChange();
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
      start: this.start,
      stop: this.stop,
      pause: this.pause
    };

    return state;
  }

}

export default Sequencer;
