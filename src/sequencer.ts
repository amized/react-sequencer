import {
  PlayStatus,
  StepsInput,
  Steps,
  OptionsInput,
  Subscriptions,
  SequencerState,
  SequencerApi,
  NotifyFunction,
  EndMode,
  Options
} from './types'

import Ticker from './ticker'

const ticker = new Ticker()

class Sequencer<TStepName> {
  private prevState: SequencerState<TStepName>
  private steps: Steps<TStepName>
  private currentStepIndex: number
  private currentTimeIn: number
  private totalDuration: number
  private endMode: EndMode
  private status: PlayStatus
  private subscriptions: Subscriptions<TStepName>
  private startedAt: number
  constructor(props: OptionsInput<TStepName>) {
    const defaults: Options<TStepName> = {
      steps: [],
      loop: false,
      complete: false,
      endMode: 'end'
    }
    const options = { ...defaults, ...props }
    if (options.steps.length === 0) {
      throw new Error('React Sequencer: At least one step required in options')
    }
    this.steps = this.generateSteps(options.steps)
    this.totalDuration = this.steps[this.steps.length - 1].endPos
    this.currentStepIndex = 0
    this.currentTimeIn = 0
    this.startedAt = 0
    this.endMode = options.loop ? 'loop' : options.endMode
    this.status = PlayStatus.IDLE
    this.subscriptions = []

    if (options.complete === true) {
      this.goToStepByIndex(this.steps.length - 1)
    }

    this.prevState = this.getState()
  }

  private generateSteps(stepsInput: StepsInput<TStepName>): Steps<TStepName> {
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

  private onLoop = (now: number) => {
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
          this.startedAt = now
          this.goToStepByIndex(0)
          this.notifyChange()
        }
      } else {
        this.currentStepIndex++
        this.notifyChange()
      }
    }
  }

  private notifyChange(): void {
    const state = this.getState()
    if (
      !this.prevState ||
      state.index !== this.prevState.index ||
      state.isPlaying !== this.prevState.isPlaying
    ) {
      this.subscriptions.forEach(fn => {
        fn(state)
      })
    }
    this.prevState = state
  }

  private goToStepByIndex(index: number) {
    this.currentStepIndex = index
    this.currentTimeIn = this.steps[index].startPos
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex]
  }

  onChange = (fn: NotifyFunction<TStepName>) => {
    this.subscriptions.push(fn)
    return () => {
      const index = this.subscriptions.findIndex(f => f === fn)
      if (index !== -1) {
        this.subscriptions.splice(index, 1)
      }
    }
  }

  play = () => {
    if (this.status === PlayStatus.PLAYING) {
      return
    }

    if (this.isComplete()) {
      this.goToStepByIndex(0)
    }
    this.status = PlayStatus.PLAYING
    ticker.onTick(this.onLoop)
    this.startedAt = ticker.currentTimeStamp - this.currentTimeIn
    this.notifyChange()
  }

  pause = () => {
    if (this.status === PlayStatus.PLAYING) {
      this.status = PlayStatus.IDLE
      ticker.offTick(this.onLoop)
      this.notifyChange()
    }
  }

  stop = () => {
    this.goToStepByIndex(0)
    this.status = PlayStatus.IDLE
    ticker.offTick(this.onLoop)
    this.notifyChange()
  }

  complete = () => {
    this.currentStepIndex = this.steps.length - 1
    this.currentTimeIn = this.totalDuration
    this.status = PlayStatus.IDLE
    ticker.offTick(this.onLoop)
    this.notifyChange()
  }

  isStopped = () => {
    return this.currentTimeIn === 0 && this.status === PlayStatus.IDLE
  }

  isComplete = () => {
    return this.currentTimeIn >= this.totalDuration
  }

  isPlaying = () => {
    return this.status === PlayStatus.PLAYING
  }

  isBefore = (stepName: TStepName): boolean => {
    const stepIndex = this.steps.findIndex(step => step.name === stepName)
    if (stepIndex === -1) {
      throw new Error(`Sequencer step ${stepName} not found.`)
    }
    return this.currentStepIndex < stepIndex
  }

  isAfter = (stepName: TStepName): boolean => {
    const stepIndex = this.steps.findIndex(step => step.name === stepName)
    if (stepIndex === -1) {
      throw new Error(`Sequencer step ${stepName} not found.`)
    }
    return this.currentStepIndex > stepIndex
  }

  getState = () => {
    const state: SequencerState<TStepName> = {
      current: this.steps[this.currentStepIndex].name,
      index: this.currentStepIndex,
      isPlaying: this.isPlaying(),
      isComplete: this.isComplete(),
      isStopped: this.isStopped()
    }

    return state
  }

  getApi = () => {
    const { play, pause, stop, complete, isBefore, isAfter } = this
    const api: SequencerApi<TStepName> = {
      play,
      pause,
      stop,
      complete,
      isBefore,
      isAfter
    }
    return api
  }
}

export default Sequencer
