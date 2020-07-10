export enum PlayStatus {
  IDLE = 'STATUS_IDLE',
  PLAYING = 'STATUS_PLAYING',
}

export type EndMode = 'loop' | 'end' | 'start'

/**** Ticker */

export type TickerNotifyFunction = (timestamp: number) => void

/**** Sequencer */

export type StepInput<TStepName> = [TStepName, number]

export type StepsInput<TStepName> = Array<StepInput<TStepName>>

export interface OptionsInput<TStepName> {
  steps: StepsInput<TStepName>
  loop?: boolean
  complete?: boolean
  endMode?: EndMode
}

export interface Options<TStepName> {
  steps: StepsInput<TStepName>
  loop: boolean
  complete: boolean
  endMode: EndMode
}

export interface Step<TStepName> {
  startPos: number
  endPos: number
  name: TStepName
}

export type Steps<TStepName> = Array<Step<TStepName>>

export type NotifyFunction<TStepName> = (
  state: SequencerState<TStepName>
) => void

export type Subscriptions<TStepName> = Array<NotifyFunction<TStepName>>

export interface SequencerState<TStepName> {
  current: TStepName
  index: number
  isPlaying: boolean
  isComplete: boolean
  isStopped: boolean
}

export interface SequencerApi<TStepName> {
  play(): void
  complete(): void
  stop(): void
  pause(): void
  isBefore(name: TStepName): boolean
  isAfter(name: TStepName): boolean
}

/*** Use Sequencer */

export type TUseSequencer<TStepName> = [
  SequencerState<TStepName>,
  SequencerApi<TStepName>
]
