import React from 'react';
import manager from './manager';

const withSequencer = function (options) {

  const {
    steps,
    loop,
    complete
  } = options;

  if (!options.steps) {
    throw new Error('Missing steps configuration in withSequencer');
  }

  return function (Component) {
    return class SequencerWrapper extends React.PureComponent {
      constructor(props) {
        super(props);
        this.sequencer = props.sequencer ? props.sequencer : manager.createSequencer({steps, loop, complete});
        this.api = {
          play: this.sequencer.play,
          stop: this.sequencer.stop,
          pause: this.sequencer.pause,
          complete: this.sequencer.complete
        };
        this.state = this.sequencer.getState();
        this.sequencer.onChange(this.handleChange);
      }

      handleChange = props => {
        this.setState(props);
      }

      render() {
        const sequencer = Object.assign(this.api, this.state);
        const props = Object.assign({}, this.props, {
          sequencer: sequencer
        });
        return (
          <Component {...props}/>
        );
      }
    };
  };
};

export default withSequencer;
