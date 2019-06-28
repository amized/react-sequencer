import React from 'react'
import { shallow, mount } from 'enzyme'
import { InjectedProps } from '../src/types'
import withSequencer from '../src/with-sequencer'
let wrapper: any

class MyComponent extends React.Component<InjectedProps> {
  render() {
    return <h1>{this.props.sequencer.current}</h1>
  }
}

const WrappedComponent = withSequencer({
  steps: [['one', 100], ['two', 200]]
})(MyComponent)

describe('when I wrap my component in withSequencer', () => {
  beforeEach(() => {
    wrapper = shallow(<WrappedComponent />)
  })

  test('should render the wrapped component', () => {
    expect(wrapper.html()).toMatch('<h1>one</h1>')
    const child = wrapper.find(MyComponent)
    expect(child.length).toEqual(1)
    expect(child.html()).toEqual('<h1>one</h1>')
  })

  test('should pass the correct props to the wrapped component', () => {
    const child = wrapper.find(MyComponent)
    const sequencer = child.props().sequencer

    expect(sequencer).toBeTruthy()
    expect(sequencer).toHaveProperty('isComplete', false)
    expect(sequencer).toHaveProperty('isPlaying', false)
    expect(sequencer).toHaveProperty('current', 'one')
    expect(sequencer).toHaveProperty('index', 0)
  })
})

test('should play the sequencer when you call play', done => {
  const WrapperComponent = withSequencer({
    steps: [['one', 100], ['two', 200]]
  })(MyComponent)
  const myWrapper = mount(<WrapperComponent />)
  const child = myWrapper.find(MyComponent)
  expect(myWrapper.html()).toEqual('<h1>one</h1>')
  const sequencer = child.props().sequencer
  sequencer.play()
  setTimeout(() => {
    myWrapper.update()
    const child = myWrapper.find(MyComponent)
    expect(child.html()).toEqual('<h1>two</h1>')
    const seq = child.props().sequencer
    expect(seq).toHaveProperty('isComplete', true)
    done()
  }, 1000)
})
