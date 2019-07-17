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
  currentStepIndex: number
  currentTimeIn: number
  totalDuration: number
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
    this.totalDuration = this.steps[this.steps.length - 1].endPos
    this.currentStepIndex = 0
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

  _onLoop = (now: number) => {
    if (this.status !== PlayStatus.PLAYING) {
      return
    }
    this.currentTimeIn = now - this.startedAt
    const currentStep = this.getCurrentStep()
    const completesAt = currentStep.endPos

    if (this.currentTimeIn >= completesAt) {
      if (this.currentStepIndex === this.steps.length - 1) {
        if (this.endMode === 'start') {
          this.stop()
          return
        }
        if (this.endMode === 'end') {
          this.complete()
          return
        }
        if (this.endMode === 'loop') {
          this.goToStepByIndex(0)
          this.startedAt = now
        }
      } else {
        this.currentStepIndex++
        this._notifyChange()
      }
    }
  }

  goToStepByIndex(index: number) {
    this.currentStepIndex = index
    this.currentTimeIn = this.steps[index].startPos
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex]
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
      this.goToStepByIndex(0)
    }
    this.status = PlayStatus.PLAYING
    ticker.onTick(this._onLoop)
    this.startedAt = ticker.currentTimeStamp - this.currentTimeIn
    this._notifyChange()
  }

  pause = () => {
    if (this.status === PlayStatus.PLAYING) {
      this.status = PlayStatus.IDLE
      ticker.offTick(this._onLoop)
      this._notifyChange()
    }
  }

  stop = () => {
    this.goToStepByIndex(0)
    this.status = PlayStatus.IDLE
    ticker.offTick(this._onLoop)
    this._notifyChange()
  }

  complete = () => {
    this.currentStepIndex = this.steps.length - 1
    this.currentTimeIn = this.totalDuration
    this.status = PlayStatus.IDLE
    ticker.offTick(this._onLoop)
    this._notifyChange()
  }

  isComplete = () => {
    return this.currentTimeIn >= this.totalDuration
  }

  isPlaying = () => {
    return this.status === PlayStatus.PLAYING
  }

  isBefore = (stepName: string): boolean => {
    const stepIndex = this.steps.findIndex(step => step.name === stepName)
    if (stepIndex === -1) {
      throw new Error(`Sequencer step ${stepName} not found.`)
    }
    return this.currentStepIndex < stepIndex
  }

  isAfter = (stepName: string): boolean => {
    const stepIndex = this.steps.findIndex(step => step.name === stepName)
    if (stepIndex === -1) {
      throw new Error(`Sequencer step ${stepName} not found.`)
    }
    return this.currentStepIndex > stepIndex
  }

  getState = () => {
    const state: SequencerState = {
      current: this.steps[this.currentStepIndex].name,
      index: this.currentStepIndex,
      isPlaying: this.isPlaying(),
      isComplete: this.isComplete()
    }

    return state
  }
}

export default Sequencer
