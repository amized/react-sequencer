import React from "react";
import { Transition } from "react-sequencer";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 50px;
`;

/* Define the sequence for when the component enters */
const inSteps = [["initial", 0],["enter-start", 0], ["enter-active", 500], ["entered", 500]];

/* Define the sequence for when the component leaves */
const outSteps = [["leave-start", 0], ["leave-active", 500], ["gone", 500]];

/* Build a Fade transition wrapper component out of our Transition component */
const Fade = props => (
  <Transition
    in={props.in}
    inSteps={inSteps}
    outSteps={outSteps}
    unmountOnExit
    runOnMount
  >
    {current => <div className={"fade " + current}>{props.children}</div>}
  </Transition>
);

class TransitionExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false
    };
  }

  toggle = () => {
    this.setState({
      in: !this.state.in
    });
  };

  render() {
    return (
      <div>
        <Wrapper>
          <Fade in={this.state.in}>Watch me go</Fade>
        </Wrapper>
        <button onClick={this.toggle}>
          {this.state.in ? "Exit" : "Enter"}
        </button>
      </div>
    );
  }
}

export default TransitionExample;
