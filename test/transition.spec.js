import 'jsdom-global/register';
import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import Transition from '../src/transition';
import enzyme, { mount, shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new ReactSixteenAdapter() });
const expect = chai.expect;

const inSteps = [
  ['in1', 100],
  ['in2', 100],
  ['in3', 100]
];

const outSteps = [
  ['out1', 100],
  ['out2', 100],
  ['out3', 100]
];

describe('<Transition>', () => {
  describe('when I mount a Transition', () => {
    it('should be in the right state with the default params', () => {
      const wrapper = shallow(
        <Transition
          inSteps={inSteps}
          outSteps={outSteps}
        />
      );

      expect(wrapper.length).to.equal(1);
      expect(wrapper.state().current).to.equal('out3');
      wrapper.unmount();
    });

    it('should be in the right state if initially in', () => {
      const wrapper = shallow(
        <Transition
          inSteps={inSteps}
          outSteps={outSteps}
          in={true}
        />
      );

      expect(wrapper.state().current).to.equal('in3');
      wrapper.unmount();
    });

    it('should be in the right state if runOnMount is set', () => {
      const wrapper = shallow(
        <Transition
          inSteps={inSteps}
          outSteps={outSteps}
          in={true}
          runOnMount
        />
      );

      expect(wrapper.state().current).to.equal('in1');
      wrapper.unmount();
    });
  });

  describe('when I mount a Transition with only one sequence defined', () => {
    it('should only run that sequence', (done) => {
      const wrapper = mount(
        <Transition
          inSteps={inSteps}
          in={true}
          runOnMount
        />
      );
      expect(wrapper.state().current).to.equal('in1');
      wrapper.setProps({ in: true });
      setTimeout(() => {
        expect(wrapper.state().current).to.equal('in2');
        wrapper.unmount();
        done();
      }, 130);
    });
  });

  describe('when a Transition goes through the in sequence', () => {
    let renderSpy, wrapper;

    before(() => {
      wrapper = mount(
        <Transition
          inSteps={inSteps}
          outSteps={outSteps}
        />
      );
      renderSpy = sinon.spy(wrapper.instance(), 'render');
    });

    it('should render the correct number of times', (done) => {
      wrapper.setProps({ in: true });
      setTimeout(() => {
        expect(renderSpy.callCount).to.equal(3);
        done();
      }, 1000);
    });

    it('should render the correct number of times', (done) => {

      wrapper.setProps({ in: false });
      setTimeout(() => {
        expect(renderSpy.callCount).to.equal(7);
        wrapper.unmount();
        done();
      }, 1000);
    });
  });
});
