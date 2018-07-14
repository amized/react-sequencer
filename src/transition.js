import React from 'react';
import PropTypes from 'prop-types';
import Sequencer from 'sequencer';

class Transition extends React.PureComponent {
  static propTypes = {
    in: PropTypes.bool,
    inSteps: PropTypes.array.isRequired,
    outSteps: PropTypes.array.isRequired,
    unmountOnExit: PropTypes.bool,
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

    this.inSeq.onChange(this.handleInSeqChange);
    this.outSeq.onChange(this.handleOutSeqChange);

    const state = {
      current: (props.in && props.runOnMount) || !props.in ?
        this.inSeq.getState().current : this.outSeq.getState().current,
      exitComplete: !props.in
    };

    this.state = state;
  }

  componentDidMount() {
    if (this.props.in && this.props.runOnMount) {
      this.inSeq.play();
    }
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

    if (typeof children !== 'function') {
      throw new Error('Child passed into Transition must be a function');
    }

    return children(current);
  }
}

export default Transition;
