import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Transition, withSequencer} from 'react-sequencer';
import _ from 'lodash';

/* Define the sequence for when the component enters */
const steps = [
  ['start', 0],
  ['out-fade-out', 15],
  ['adapt-height', 250],
  ['in-fade-in', 200],
  ['finish', 15]
];

const Wrapper = styled.div`
  transition: height 0.25s cubic-bezier(0.640, 0.080, 0.455, 0.925);
  position: relative;
  ${props => {
    switch (props.current) {
      case 'start':
      case 'out-fade-out':
        return `
          height: ${props.outHeight}px;
        `;
      case 'adapt-height':
      case 'in-fade-in':
        return `
          height: ${props.inHeight}px;
        `;
      case 'finish':
        return `
          height: auto;
        `;
    }
  }}
`;

const ContentWrapper = styled.div`
  transition: opacity 0.2s linear;
  width: 100%;
  top: 0;
  left: 0;
  ${props => {
    if (props.in) {
      switch (props.current) {
        case 'start':
          return `
            opacity: 0;
            position: absolute;
          `;
        case 'out-fade-out':
        case 'adapt-height':
          return `
            opacity: 0;
            position: absolute;
          `;
        case 'in-fade-in':
          return `
            position: absolute;
            opacity: 1;
          `;
        case 'finish':
          return `
            position: relative;
            opacity: 1;
          `;
      }
    } else {
      switch (props.current) {
        case 'start':
          return `
            opacity: 1;
            position: absolute;
          `;
        case 'out-fade-out':
        case 'adapt-height':
          return `
            opacity: 0;
            position: absolute;
          `;
        case 'in-fade-in':
          return `
            position: absolute;
            opacity: 0;
          `;
        case 'finish':
          return `
            position: absolute;
            opacity: 0;
            display: none;
          `;
      }
    }
  }}
`;

class Fader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.keys = 0;
    this.currentHeight = 0;
    this.inHeight = 0;
    this.prevChildren = null;
    this.state = {
      currentChildren: props.children,
      prevChildren: null,
      currentKey: this.getNewKey(),
      prevKey: null
    }
  }

  getNewKey = () => {
    return this.keys++;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sequencer.current !== this.props.sequencer.current) {
      if (nextProps.sequencer.current === 'start') {
        this.currentHeight = this.wrapperEl.offsetHeight;
        this.setState({
          prevChildren: this.props.children,
          currentKey: this.getNewKey(),
          prevKey: this.state.currentKey
        });
      }
    }
  }

  assignWrapperRef = el => {
    this.wrapperEl = el;
  }

  assignInRef = el => {
    this.inEl = el;
    this.inHeight = el ? el.offsetHeight : 0;
  }

  assignOutRef = el => {
    this.outEl = el;
  }

  render() {
    const current = this.props.sequencer.current;
    return (
      <Wrapper innerRef={this.assignWrapperRef} current={current} inHeight={this.inHeight} outHeight={this.currentHeight}>
        <ContentWrapper key={this.state.currentKey} innerRef={this.assignInRef} in={true} current={current}>
          {this.props.children}
        </ContentWrapper>
        <ContentWrapper key={this.state.prevKey} innerRef={this.assignOutRef} current={current}>
          {this.state.prevChildren}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

Fader = withSequencer({
  steps: steps,
  complete: true,
  shouldPlayOnUpdate: (currentProps, nextProps) => {
    if (nextProps.children !== currentProps.children) {
      const nextChildren = React.Children.toArray(nextProps.children).map(child => child.key);
      const currentChildren = React.Children.toArray(currentProps.children).map(child => child.key);
      const diff = _.difference(nextChildren, currentChildren);
      if (diff.length > 0) {
        return true;
      }
    }
    return false;
  }
})(Fader);

export default Fader;
