import * as React from 'react'
import Sequencer from './sequencer'
import {
  WithSequencerProps,
  SequencerState,
  InjectedAPI,
  InjectedProps
} from './types'
import { Subtract } from 'utility-types'

const withSequencer = function(options: WithSequencerProps) {
  if (!options.steps) {
    throw new Error('Missing steps configuration in withSequencer')
  }
  return function<BaseProps extends InjectedProps>(
    Component: React.ComponentType<BaseProps>
  ) {
    type HocProps = Subtract<BaseProps, InjectedProps> & WithSequencerProps
    return class SequencerWrapper extends React.Component<
      HocProps,
      InjectedProps
    > {
      sequencer: Sequencer
      constructor(props: HocProps) {
        super(props)
        const { steps, loop, complete, endMode } = props

        this.sequencer = new Sequencer({ steps, loop, complete, endMode })

        const sequencerState = this.sequencer.getState()
        const sequencerApi = this.getApi()

        this.state = {
          sequencer: Object.assign(sequencerState, sequencerApi)
        }

        this.sequencer.onChange(this.handleChange)
      }

      static defaultProps: WithSequencerProps = {
        steps: options.steps,
        loop: options.loop,
        endMode: options.endMode,
        complete: options.complete,
        shouldPlayOnUpdate: options.shouldPlayOnUpdate,
        shouldStopOnUpdate: options.shouldStopOnUpdate,
        shouldCompleteOnUpdate: options.shouldCompleteOnUpdate
      }

      componentWillReceiveProps(nextProps: HocProps) {
        const {
          shouldPlayOnUpdate,
          shouldStopOnUpdate,
          shouldCompleteOnUpdate
        } = this.props

        if (
          shouldCompleteOnUpdate &&
          shouldCompleteOnUpdate(this.props, nextProps)
        ) {
          this.sequencer.complete()
        }
        if (shouldStopOnUpdate && shouldStopOnUpdate(this.props, nextProps)) {
          this.sequencer.stop()
        }
        if (shouldPlayOnUpdate && shouldPlayOnUpdate(this.props, nextProps)) {
          this.sequencer.play()
        }
      }

      getApi(): InjectedAPI {
        return {
          play: this.sequencer.play,
          stop: this.sequencer.stop,
          pause: this.sequencer.pause,
          complete: this.sequencer.complete
        }
      }

      handleChange = (sequencerState: SequencerState) => {
        const sequencer = sequencerState as SequencerState & InjectedAPI
        sequencer.play = this.sequencer.play
        sequencer.stop = this.sequencer.stop
        sequencer.pause = this.sequencer.pause
        sequencer.complete = this.sequencer.complete
        this.setState({
          sequencer
        })
      }

      render() {
        const {
          steps,
          loop,
          complete,
          shouldPlayOnUpdate,
          shouldStopOnUpdate,
          shouldCompleteOnUpdate,
          ...props
        } = this.props

        return <Component {...props as any} sequencer={this.state.sequencer} />
      }
    }
  }
}

export default withSequencer
