import React from 'react';
import PropTypes from 'prop-types';
import {withSequencer} from 'react-sequencer';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const CharWrapper = styled.div`
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
    this.chars = ('React Sequence').split('');
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
              <CharWrapper active={index === seq.index} isPrev={index === seq.index - 1}>
                {char}
              </CharWrapper>
            ))
          }
        </Wrapper>
        {
          seq.isPlaying ?
            <button onClick={seq.pause}>Pause</button> :
            <button onClick={seq.start}>Start</button>

        }
      </div>
    );
  }
}

const steps = Array(14).fill(['a', 200]);

export default withSequencer({
  steps: steps,
  loop: true
})(SequencedTitle);
