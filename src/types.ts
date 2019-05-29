export enum PlayStatus {
  IDLE = 'STATUS_IDLE',
  PLAYING = 'STATUS_PLAYING',
  COMPLETE = 'STATUS_COMPLETE'
}

export type EndMode = 'loop' | 'end' | 'start'

/**** Ticker */

export type TickerNotifyFunction = (timestamp: number) => void

/**** Sequencer */

export type StepInput = [string, number]

export type StepsInput = Array<StepInput>

export interface OptionsInput {
  steps: StepsInput
  loop?: boolean
  complete?: boolean
  endMode?: EndMode
}

export interface Options {
  steps: StepsInput
  loop: boolean
  complete: boolean
  endMode: EndMode
}

export interface Step {
  startPos: number
  endPos: number
  name: string
}

export type Steps = Array<Step>

export type NotifyFunction = (state: SequencerState) => void

export type Subscriptions = Array<NotifyFunction>

export interface SequencerState {
  current: string
  index: number
  isPlaying: boolean
  isComplete: boolean
}

/*** WithSequencer */

export interface WithSequencerProps extends OptionsInput {
  shouldPlayOnUpdate?: { (currProps: any, nextProps: any): boolean }
  shouldStopOnUpdate?: { (currProps: any, nextProps: any): boolean }
  shouldCompleteOnUpdate?: { (currProps: any, nextProps: any): boolean }
}

export interface InjectedAPI {
  play(): void
  complete(): void
  stop(): void
  pause(): void
}

export interface InjectedProps {
  sequencer: InjectedAPI & SequencerState
}
