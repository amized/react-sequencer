import React from 'react';
import manager from './manager';

const withSequencer = function (options) {

  const {
    steps,
    loop,
    complete,
    shouldPlayOnUpdate,
    shouldStopOnUpdate,
    shouldCompleteOnUpdate
  } = options;

  if (!options.steps) {
    throw new Error('Missing steps configuration in withSequencer');
  }

  return function (Component) {
    return class SequencerWrapper extends React.Component {
      constructor(props) {
        super(props);
        this.sequencer = props.sequencer ? props.sequencer : manager.createSequencer({steps, loop, complete});
        this.api = {
          play: this.sequencer.play,
          stop: this.sequencer.stop,
          pause: this.sequencer.pause,
          complete: this.sequencer.complete
        };
        const sequencerState = this.sequencer.getState();
        this.state = {
          sequencer: Object.assign(sequencerState, this.api)
        };
        this.sequencer.onChange(this.handleChange);
      }

      componentWillReceiveProps(nextProps) {
        if (shouldCompleteOnUpdate && shouldCompleteOnUpdate(this.props, nextProps)) {
          this.sequencer.complete();
        }
        if (shouldStopOnUpdate && shouldStopOnUpdate(this.props, nextProps)) {
          this.sequencer.stop();
        }
        if (shouldPlayOnUpdate && shouldPlayOnUpdate(this.props, nextProps)) {
          this.sequencer.play();
        }
      }

      handleChange = props => {
        const sequencer = Object.assign(props, this.api);
        this.setState({
          sequencer: sequencer
        });
      }

      render() {
        const childProps = Object.assign({}, this.props, {
          sequencer: this.state.sequencer
        });
        return (
          <Component {...childProps}/>
        );
      }
    };
  };
};

export default withSequencer;
