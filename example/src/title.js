import React from 'react';
import PropTypes from 'prop-types';
import {withSequencer} from 'react-sequencer';
import styled from 'styled-components';

const Wrapper = styled.h1`
  display: flex;
`;

const CharWrapper = styled.span`
  transform: ${props => props.isPrev ? 'translate3d(0,0,0) scale(2)' : props.active ? 'translate3d(0,0,0) scale(2)' : 'translate3d(0,0,0) scale(1)'};
  color: ${props => props.isPrev ? '#6fcef5' : props.active ? '#7ae87a' : '#000'};
  transform-origin: 50% 50%;
  transition: transform 0.4s linear, color 0.3s linear;
  margin: 0 10px;
`;

class SequencedTitle extends React.Component {
  static propTypes = {
    sequencer: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.chars = ('React Sequencer').split('');
  }

  componentDidMount() {
    this.props.sequencer.play();
  }

  render() {
    const seq = this.props.sequencer;

    return (
      <div>
        <Wrapper>
          {
            this.chars.map((char, index) => (
              <CharWrapper key={index} active={index === seq.index} isPrev={index === seq.index - 1}>
                {char}
              </CharWrapper>
            ))
          }
        </Wrapper>
      </div>
    );
  }
}

const steps = Array.apply(null, {length: 15}).map((item, index) => ([index, 200]));
export default withSequencer({
  steps: steps,
  loop: true,
  complete: false
})(SequencedTitle);
