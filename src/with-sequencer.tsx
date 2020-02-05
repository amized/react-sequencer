import * as React from 'react'
import Sequencer from './sequencer'
import { WithSequencerProps, SequencerState, InjectedProps } from './types'
import { Subtract } from 'utility-types'

const defaultOptions: WithSequencerProps<any> = {
  steps: [],
  loop: false,
  endMode: 'end',
  complete: false
}

const withSequencer = function<TStepName extends string>(
  options?: WithSequencerProps<TStepName>
) {
  return function<BaseProps extends InjectedProps>(
    Component: React.ComponentType<BaseProps>
  ) {
    type HocProps = Subtract<BaseProps, InjectedProps> &
      WithSequencerProps<TStepName>
    return class SequencerWrapper extends React.Component<
      HocProps,
      InjectedProps
    > {
      sequencer: Sequencer<TStepName>

      static defaultProps = options
        ? { ...defaultOptions, ...options }
        : defaultOptions

      constructor(props: HocProps) {
        super(props)
        const { steps, loop, complete, endMode } = props
        this.sequencer = new Sequencer({ steps, loop, complete, endMode })
        const sequencerState = this.sequencer.getState()
        const sequencerApi = this.sequencer.getApi()
        this.state = {
          sequencer: { ...sequencerState, ...sequencerApi }
        }
        this.sequencer.onChange(this.handleChange)
      }

      UNSAFE_componentWillReceiveProps(nextProps: HocProps) {
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

      handleChange = (sequencerState: SequencerState) => {
        const sequencer = { ...sequencerState, ...this.sequencer.getApi() }
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
