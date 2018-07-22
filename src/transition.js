import React from 'react';
import PropTypes from 'prop-types';
import Sequencer from './sequencer';

class Transition extends React.PureComponent {
  static propTypes = {
    /** Toggles the component in and out. */
    in: PropTypes.bool,
    /** Sequence to perform when in becomes true. */
    inSteps: PropTypes.array.isRequired,
    /** Sequence to perform when in becomes false. */
    outSteps: PropTypes.array.isRequired,
    /** Whether or not to run the 'in' sequence when the component mounts. */
    unmountOnExit: PropTypes.bool,
    /** If set to true, the child element is removed from the dom when
     * the out sequence gets to a completed state. Note that your
     * component will remain mounted for the duration of the last
     * step before unmounting. */
    runOnMount: PropTypes.bool
  }

  static defaultProps = {
    in: false,
    unmountOnExit: false,
    runOnMount: false
  }

  constructor(props) {
    super(props);
    this.inSeq = new Sequencer({
      steps: props.inSteps
    });
    this.outSeq = new Sequencer({
      steps: props.outSteps
    });

    let current;

    if (props.in && props.runOnMount) {
      current = this.inSeq.getState().current;
    } else if (!props.in) {
      this.outSeq.complete();
      current = this.outSeq.getState().current;
    } else {
      this.inSeq.complete();
      current = this.inSeq.getState().current;
    }

    this.state = {
      current,
      exitComplete: !props.in
    };

    this.inSeq.onChange(this.handleInSeqChange);
    this.outSeq.onChange(this.handleOutSeqChange);
  }

  componentDidMount() {
    if (this.props.in && this.props.runOnMount) {
      this.inSeq.play();
    }
  }

  componentWillUnmount() {
    this.inSeq.stop();
    this.inSeq = null;
    this.outSeq.stop();
    this.outSeq = null;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.in && this.props.in) {
      this.outSeq.stop();
      this.inSeq.play();
    } else if (prevProps.in && !this.props.in) {
      this.inSeq.stop();
      this.outSeq.play();
    }
  }

  handleInSeqChange = seq => {
    this.setState({
      current: seq.current,
      exitComplete: false
    });
  }

  handleOutSeqChange = seq => {
    this.setState({
      current: seq.current,
      exitComplete: seq.isComplete
    });
  }

  render() {
    const {children, unmountOnExit} = this.props;
    const show = this.props.in;
    const {current, exitComplete} = this.state;

    if (unmountOnExit && show === false && exitComplete === true) {
      return null;
    }

    if (!children) {
      return null;
    }

    if (typeof children !== 'function') {
      throw new Error('Child passed into Transition must be a function');
    }

    return children(current);
  }
}

export default Transition;
