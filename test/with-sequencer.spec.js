import React from 'react';
import chai from 'chai';
import withSequencer from '../src/with-sequencer';
import enzyme, { shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

import {JSDOM} from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = global.window.document;

enzyme.configure({ adapter: new ReactSixteenAdapter() });
const expect = chai.expect;

class MyComponent extends React.Component {
  render() {
    return (<div>Hello</div>);
  }
}

let wrapper;

describe('when I wrap my component in withSequence', () => {
  before(() => {
    const WrappedComponent = withSequencer({
      steps: [
        ['one', 100],
        ['two', 200]
      ]
    })(MyComponent);

    wrapper = shallow(<WrappedComponent/>);
  });

  it('should render the wrapped component', () => {
    expect(wrapper.html()).to.not.be.null;
    const child = wrapper.find(MyComponent);
    expect(child.length).to.equal(1);
  });

  it('should pass the correct props to the wrapped component', () => {
    const child = wrapper.find(MyComponent);
    const sequencer = child.props().sequencer;

    expect(sequencer).to.not.be.null;
    expect(sequencer).to.not.be.undefined;
    expect(sequencer).to.include({isComplete: false});
    expect(sequencer).to.include({isPlaying: false});
    expect(sequencer).to.include({current: 'one'});
    expect(sequencer).to.include({index: 0});
  });


  it('should pass the correct props to the wrapped component', () => {
    const child = wrapper.find(MyComponent);
    const sequencer = child.props().sequencer;

    expect(sequencer).to.not.be.null;
    expect(sequencer).to.not.be.undefined;
    expect(sequencer).to.include({isComplete: false});
    expect(sequencer).to.include({isPlaying: false});
    expect(sequencer).to.include({current: 'one'});
    expect(sequencer).to.include({index: 0});
  });
});
