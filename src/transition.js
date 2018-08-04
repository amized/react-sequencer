import React from 'react';
import PropTypes from 'prop-types';
import manager from './manager';

class Transition extends React.PureComponent {
  static propTypes = {
    /** Toggles the component in and out. */
    in: PropTypes.bool,
    /** Sequence to perform when in becomes true. */
    inSteps: PropTypes.array.isRequired,
    /** Sequence to perform when in becomes false. */
    outSteps: PropTypes.array,
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
    runOnMount: false,
    outSteps: null
  }

  constructor(props) {
    super(props);
    let current = null;
    this.inSeq = manager.createSequencer({
      steps: props.inSteps
    });

    if (props.outSteps) {
      this.outSeq = manager.createSequencer({
        steps: props.outSteps
      });
    }

    switch (true) {
      case props.in && props.runOnMount: {
        this.inSeq.stop();
        current = this.inSeq.getState().current;
        break;
      }
      case !props.in: {
        if (this.outSeq) {
          this.outSeq.complete();
          current = this.outSeq.getState().current;
        } else {
          this.inSeq.stop();
          current = this.inSeq.getState().current;
        }
        break;
      }
      default: {
        this.inSeq.complete();
        current = this.inSeq.getState().current;
      }
    }

    this.state = {
      current,
      exitComplete: !props.in
    };

    this.inSeq.onChange(this.handleInSeqChange);
    if (this.outSeq) {
      this.outSeq.onChange(this.handleOutSeqChange);
    }
  }

  componentDidMount() {
    if (this.props.in && this.props.runOnMount) {
      this.inSeq.play();
    }
  }

  componentWillUnmount() {
    this.inSeq.stop();
    this.inSeq = null;
    if (this.outSeq) {
      this.outSeq.stop();
      this.outSeq = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.in && !nextProps.in) {
      this.inSeq.stop();
      if (this.outSeq) {
        this.outSeq.play();
      }
    } else if (!this.props.in && nextProps.in) {
      if (this.outSeq) {
        this.outSeq.stop();
      }
      this.inSeq.play();
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
