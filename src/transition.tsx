import React from 'react'
import Sequencer from './sequencer'
import { StepsInput, SequencerState } from './types'

interface Props {
  /** Toggles the component in and out. */
  in: boolean
  /** Sequence to perform when in becomes true. */
  inSteps: StepsInput
  /** Sequence to perform when in becomes false. */
  outSteps: StepsInput
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

class Transition extends React.PureComponent<Props, State> {
  inSeq: Sequencer
  outSeq: Sequencer | null
  static defaultProps = {
    in: false,
    unmountOnExit: false,
    runOnMount: false,
    outSteps: null
  }

  constructor(props: Props) {
    super(props)
    let current = null
    this.outSeq = null
    this.inSeq = new Sequencer({
      steps: props.inSteps
    })

    if (props.outSteps) {
      this.outSeq = new Sequencer({
        steps: props.outSteps
      })
    }

    switch (true) {
      case props.in && props.runOnMount: {
        this.inSeq.stop()
        current = this.inSeq.getState().current
        break
      }
      case !props.in: {
        if (this.outSeq) {
          this.outSeq.complete()
          current = this.outSeq.getState().current
        } else {
          this.inSeq.stop()
          current = this.inSeq.getState().current
        }
        break
      }
      default: {
        this.inSeq.complete()
        current = this.inSeq.getState().current
      }
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

  componentWillReceiveProps(nextProps: Props) {
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
