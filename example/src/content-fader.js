import React from 'react';
import PropTypes from 'prop-types';
import {withSequencer, Transition} from 'react-sequencer';
import styled from 'styled-components';

const inSteps = [
  ['initial', 0],
  ['fade-in-start', 400],
  ['fade-in-active', 400],
  ['in', 400]
];

const outSteps = [
  ['fade-out-start', 0],
  ['fade-out-active', 400],
  ['faded-out', 400],
  ['out', 400]
];

const FadeWrapper = styled.div`
  transition: opacity 0.4s linear;
  top: 0;
  left: 0;
  width: 100%;
  ${props => {
    switch (props.current) {
      case 'initial':
      case 'fade-in-start':
        return `
          opacity: 0;
          position: absolute;
        `;
      case 'fade-in-active':
      case 'in':
        return `
          opacity: 1;
          position: relative;
        `;
      case 'fade-out-start':
        return `
          opacity: 1;
          position: relative;
        `;
      case 'fade-out-active':
        return `
          opacity: 0;
          position: relative;
        `;
      case 'faded-out':
        return `
          opacity: 0;
          position: absolute;
        `;
      case 'out': {
        return `
          display: none;
          opacity: 0;
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

const Wrapper = styled.div`
  position: relative;
`;

const Tab = styled.div`
  border: 2px solid #333;
`;

const Tab1 = styled(Tab)`
  height: 200px;
`;

const Tab2 = styled(Tab)`
  height: 300px;
`;

const Tab3 = styled(Tab)`
  height: 400px;
`;

class ContentFader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  handleToggle = e => {
    const next = (this.state.currentTab + 1) % 3;
    this.setState({currentTab: next});
  }

  render() {
    const {currentTab} = this.state;
    return (
      <div>
        <button onClick={this.handleToggle}>Toggle</button>
        <Wrapper>
          <Fade in={currentTab===0}>
            <Tab1>Tab1</Tab1>
          </Fade>
          <Fade in={currentTab===1}>
            <Tab2>Tab2</Tab2>
          </Fade>
          <Fade in={currentTab===2}>
            <Tab3>Tab3</Tab3>
          </Fade>
        </Wrapper>
        Under content
      </div>
    );
  }
}

export default ContentFader;
