import React from 'react';
import Sequencer from './sequencer';

const withSequencer = function (options) {
  const {
    steps,
    loop
  } = options;

  if (!steps) {
    throw new Error('Missing steps configuration in withSequencer');
  }

  return function (Component) {
    return class SequencerWrapper extends React.PureComponent {
      constructor(props) {
        super(props);
        this.sequencer = new Sequencer({steps, loop});
        this.state = this.sequencer.getState();

        this.sequencer.onChange(this.handleChange);
      }

      handleChange = props => {
        this.setState(props);
      }

      render() {
        const props = Object.assign({}, this.props, {
          sequencer: this.state
        });

        return (
          <Component {...props}/>
        );
      }
    };
  };
};

export default withSequencer;
