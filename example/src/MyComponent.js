import React from 'react';
import {withSequencer, Transition} from 'react-sequencer';
import styled from 'styled-components';

const Sequencer = styled.div`
  display: flex;
`;

const SeqStep = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.highlight ? '#FFF' : 'auto'};
  background: ${props => props.highlight ? 'blue' : 'auto'};
  transform: ${props => props.highlight ? 'scale(1.2)' : 'scale(1)'};
  transition: background 0.2s linear, color 0.2s linear, transform 0.2s linear;
  width: 40px;
  height: 40px;
  border: 1px solid #EEE;
  margin: 20px;
`;

const InnerWrapper = styled.div`
  transition: opacity 0.5s, transform 1s;
  transform-origin: 0px 0px;
  ${props => {
    switch (props.current) {
      case 'not-entered':
        return `
          display: none;
          opacity: 0;
        `;
      case 'enter-start':
        return `
          display: block;
          opacity: 0;
          transform: scale(1);
        `;
      case 'enter-active':
      case 'entered':
        return `
          display: block;
          opacity: 1;
          transform: scale(1.5);
        `;
      case 'leave':
      case 'leave-active':
        return `
          opacity: 0;
          transform: scale(1);
        `;
      case 'left':
        return `
          display: none;
        `;
      default:
        return 'display: block;';
    }
  }}
`;

class MyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      in: true
    };
  }
  handleStart = () => {
    this.props.sequencer.play();
  }

  handleStop = () => {
    this.props.sequencer.pause();
  }

  handleToggle = () => {
    this.setState({
      in: !this.state.in
    });
  }

  render() {
    const {sequencer} = this.props;
    const steps = Array.apply(null, Array(8));

    return (
      <div>This is my component {sequencer.current}
        <div>
          <button onClick={this.handleToggle}>Toggle</button>
        </div>
        {/*<Transition
          in={this.state.in}
          inSteps={[
            ['left', 0],
            ['enter-start', 0],
            ['enter-active', 500],
            ['entered', 0]
          ]}
          outSteps={[
            ['entered', 0],
            ['leave-start', 10],
            ['leave-active', 500],
            ['exited', 0]
          ]}
          unmountOnExit
        >
          <InnerWrapper>Hellloo!!</InnerWrapper>
        </Transition>
        */}
        <Sequencer>
          {
            steps.map((step, index) => (
              <SeqStep key={index} highlight={sequencer.index === index}>
                {index}
              </SeqStep>
            ))
          }
        </Sequencer>
        <button onClick={sequencer.isPlaying ? this.handleStop : this.handleStart}>
          {
            sequencer.isPlaying ? 'Pause' : 'Start'
          }
        </button>
      </div>
    );
  }
};

export default withSequencer({
  steps: [
    ['one', 500],
    ['two', 500],
    ['three', 500],
    ['four', 500],
    ['five', 500],
    ['six', 500],
    ['seven', 500],
    ['eight', 500]
  ],
  loop: false
})(MyComponent);

