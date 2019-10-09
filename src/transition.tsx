import React from 'react'
import Sequencer from './sequencer'
import { StepsInput, SequencerState } from './types'

interface Props<TStepName> {
  /** Toggles the component in and out. */
  in: boolean
  /** Sequence to perform when in becomes true. */
  inSteps: StepsInput<TStepName>
  /** Sequence to perform when in becomes false. */
  outSteps: StepsInput<TStepName>
  /** Whether or not to run the 'in' sequence when the component mounts. */
  unmountOnExit: boolean
  /** If set to true, the child element is removed from the dom when
   * the out sequence gets to a completed state. Note that your
   * component will remain mounted for the duration of the last
   * step before unmounting. */
  runOnMount: boolean
}

interface State {
  current: string
  exitComplete: boolean
}

class Transition<TStepName extends string> extends React.PureComponent<
  Props<TStepName>,
  State
> {
  inSeq: Sequencer<TStepName>
  outSeq: Sequencer<TStepName> | null
  static defaultProps = {
    in: false,
    unmountOnExit: false,
    runOnMount: false,
    outSteps: null
  }

  constructor(props: Props<TStepName>) {
    super(props)
    let current = null
    this.outSeq = props.outSteps
      ? new Sequencer({
          steps: props.outSteps
        })
      : null
    this.inSeq = new Sequencer({
      steps: props.inSteps
    })

    if (props.in && props.runOnMount) {
      this.inSeq.stop()
      current = this.inSeq.getState().current
    } else if (!props.in) {
      if (this.outSeq) {
        this.outSeq.complete()
        current = this.outSeq.getState().current
      } else {
        this.inSeq.stop()
        current = this.inSeq.getState().current
      }
    } else {
      this.inSeq.complete()
      current = this.inSeq.getState().current
    }

    this.state = {
      current,
      exitComplete: !props.in
    }

    this.inSeq.onChange(this.handleInSeqChange)
    if (this.outSeq) {
      this.outSeq.onChange(this.handleOutSeqChange)
    }
  }

  componentDidMount() {
    if (this.props.in && this.props.runOnMount) {
      this.inSeq.play()
    }
  }

  componentWillUnmount() {
    this.inSeq.stop()
    if (this.outSeq) {
      this.outSeq.stop()
      this.outSeq = null
    }
  }

  componentWillReceiveProps(nextProps: Props<TStepName>) {
    if (this.props.in && !nextProps.in) {
      this.inSeq.stop()
      if (this.outSeq) {
        this.outSeq.play()
      }
    } else if (!this.props.in && nextProps.in) {
      if (this.outSeq) {
        this.outSeq.stop()
      }
      this.inSeq.play()
    }
  }

  handleInSeqChange = (seq: SequencerState) => {
    this.setState({
      current: seq.current,
      exitComplete: false
    })
  }

  handleOutSeqChange = (seq: SequencerState) => {
    this.setState({
      current: seq.current,
      exitComplete: seq.isComplete
    })
  }

  render() {
    const { children, unmountOnExit } = this.props
    const show = this.props.in
    const { current, exitComplete } = this.state

    if (unmountOnExit && show === false && exitComplete === true) {
      return null
    }

    if (!children) {
      return null
    }

    if (typeof children !== 'function') {
      throw new Error('Child passed into Transition must be a function')
    }

    return children(current)
  }
}

export default Transition
