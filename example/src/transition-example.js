import React from 'react';
import {withSequencer, Transition} from 'react-sequencer';
import styled from 'styled-components';

/* Define the sequence for when the component enters */
const inSteps = [
  ['enter-start', 0],
  ['enter-active', 500],
  ['entered', 0]
];

/* Define the sequence for when the component leaves */
const outSteps = [
  ['leave-start', 0],
  ['leave-active', 500],
  ['gone', 500]
];

/* Build a Fade transition wrapper component out of our Transition component */
const Fade = props => (
  <Transition
    in={props.in}
    inSteps={inSteps}
    outSteps={outSteps}
    unmountOnExit
    runOnMount
  >
    {current => (
      <div className={'fade ' + current}>
        {props.children}
      </div>
    )}
  </Transition>
);

class TransitionExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in: true
    };
  }

  toggle = () => {
    this.setState({
      in: !this.state.in
    });
  }

  render() {
    return (
      <div>
        <Fade in={this.state.in}>
          My text yeah!
        </Fade>
        <button onClick={this.toggle}>{this.state.in ? 'Exit' : 'Enter'}</button>
      </div>
    );
  }
}

export default TransitionExample;
