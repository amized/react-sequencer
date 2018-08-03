import React from 'react';
import PropTypes from 'prop-types';
import {withSequencer, Transition} from 'react-sequencer';
import styled from 'styled-components';



const inSteps = [
  ['initial', 0],
  ['fade-in-start', 200],
  ['fade-in-active', 200],
  ['in', 200]
];

const outSteps = [
  ['fade-out-start', 0],
  ['fade-out-active', 200],
  ['out', 200]
];

const FadeWrapper = styled.div`
  transition: opacity 0.2s linear;
  ${props => {
    switch (props.current) {
      case 'initial':
        return `
          opacity: 0;
          position: absolute;
        `;
      case 'fade-in-start':
        return `
          opacity: 1;
          position: absolute;
        `;
      case 'fade-in-active':
      case 'in':
        return `
          opacity: 1;
          position: relative;
        `;
      case 'fade-out-start':
      case 'fade-out-active':
        return `
          opacity: 0;
          position: relative;
        `;
      case 'out': {
        return `
          display: none;
        `;
      }

      default:
        return '';
    }
  }}
`;

const Fade = props => (
  <Transition
    inSteps={inSteps}
    outSteps={outSteps}
    in={props.in}
  >
    {
      current => (
        <FadeWrapper current={current}>
          {props.children}
        </FadeWrapper>
      )
    }
  </Transition>
);




class ContentFader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  handleToggle = e => {
    const next = (this.state.currentTab + 1) % 3;
    this.select(next);
  }

  select = tab => {
    this.setState({currentTab: tab});
  }

  render() {
    const {currentTab} = this.state;
    return (
      <div>
      <div>
        <Fade in={currentTab===0}>
          Tab1
        </Fade>
        <Fade in={currentTab===1}>
          Tab2
        </Fade>
        <Fade in={currentTab===2}>
          Tab3
        </Fade>
      </div>
        <button onClick={this.handleToggle}>Toggle</button>
      </div>
    );
  }
}

export default ContentFader;