import {
  PlayStatus,
  StepsInput,
  Steps,
  OptionsInput,
  Subscriptions,
  SequencerState,
  NotifyFunction,
  EndMode,
  Options
} from './types'
import merge from 'lodash.merge'

import Ticker from './ticker'

const ticker = new Ticker()

class Sequencer {
  steps: Steps
  currentStep: number
  currentTimeIn: number
  endMode: EndMode
  status: PlayStatus
  requestID: string | null
  subscriptions: Subscriptions
  startedAt: number
  constructor(props: OptionsInput) {
    const defaults: Options = {
      steps: [],
      loop: false,
      complete: false,
      endMode: 'end'
    }
    const options = merge(defaults, props)
    this.steps = this._generateSteps(options.steps)
    this.currentStep = 0
    this.currentTimeIn = 0
    this.startedAt = 0
    this.endMode = options.loop ? 'loop' : options.endMode
    this.status = PlayStatus.IDLE
    this.requestID = null
    this.subscriptions = []

    if (options.complete === true) {
      this.complete()
    }
  }

  _generateSteps(stepsInput: StepsInput): Steps {
    if (!stepsInput) {
      throw new Error('Invalid format.')
    }

    let prev = 0

    const steps = stepsInput.map(step => {
      if (!Array.isArray(step) || step.length !== 2) {
        throw new Error('Invalid format. See docs for correct structure.')
      }

      const startPos = prev
      const endPos = step[1] + prev
      prev = endPos
      return {
        startPos,
        endPos,
        name: step[0]
      }
    })

    return steps
  }

  _getStep(stepId: number) {
    return this.steps[stepId]
  }

  _onLoop = (now: number) => {
    if (this.status !== PlayStatus.PLAYING) {
      return
    }
    const currentStep = this._getStep(this.currentStep)
    const currentTimeIn = (this.currentTimeIn = now - this.startedAt)
    const completesAt = currentStep.endPos

    if (currentTimeIn >= completesAt) {
      if (this.currentStep === this.steps.length - 1) {
        if (this.endMode === 'start') {
          this.stop()
          return
        }

        if (this.endMode === 'loop') {
          this.currentStep = 0
          this.currentTimeIn = 0
          this.startedAt = now
        }

        if (this.endMode === 'end') {
          this.status = PlayStatus.COMPLETE
        }
      } else {
        this.currentStep++
      }
      this._notifyChange()
    }
  }

  _notifyChange(): void {
    const state = this.getState()

    this.subscriptions.forEach(fn => {
      fn(state)
    })
  }

  onChange = (fn: NotifyFunction) => {
    this.subscriptions.push(fn)
  }

  play = () => {
    if (this.status === PlayStatus.PLAYING) {
      return
    }

    if (this.isComplete()) {
      this.currentStep = 0
      this.currentTimeIn = 0
    }
    this.startedAt = ticker.currentTimeStamp - this.currentTimeIn
    this.status = PlayStatus.PLAYING
    ticker.onTick(this._onLoop)
    this._notifyChange()
  }

  pause = () => {
    if (this.status !== PlayStatus.IDLE) {
      this.status = PlayStatus.IDLE
      ticker.offTick(this._onLoop)
      this._notifyChange()
    }
  }

  stop = () => {
    if (this.status !== PlayStatus.IDLE) {
      this.currentStep = 0
      this.currentTimeIn = 0
      this.status = PlayStatus.IDLE
      ticker.offTick(this._onLoop)
      this._notifyChange()
    }
  }

  complete = () => {
    if (this.status !== PlayStatus.COMPLETE) {
      this.currentStep = this.steps.length - 1
      this.status = PlayStatus.COMPLETE
      this._notifyChange()
    }
  }

  isComplete = () => {
    return this.status === PlayStatus.COMPLETE
  }

  isPlaying = () => {
    return this.status === PlayStatus.PLAYING
  }

  getState = () => {
    const state: SequencerState = {
      current: this.steps[this.currentStep].name,
      index: this.currentStep,
      isPlaying: this.isPlaying(),
      isComplete: this.isComplete()
    }

    return state
  }
}

export default Sequencer
