import React from 'react'
import { mount } from 'enzyme'
import useSequencer from '../src/use-sequencer'

const TestHook = ({ callback }: { callback: Function }) => {
  callback()
  return null
}

export const testHook = (callback: Function) => {
  mount(<TestHook callback={callback} />)
}

let state: any
let api: any

describe('useSequencer', () => {
  beforeEach(() => {
    testHook(() => {
      ;[state, api] = useSequencer({
        steps: [['one', 100], ['two', 200]]
      })
    })
  })

  test('state should have the correct properties', () => {
    expect(state).toHaveProperty('current')
    expect(state).toHaveProperty('index')
    expect(state).toHaveProperty('isPlaying')
    expect(state).toHaveProperty('isComplete')
  })

  test('api should have the correct properties', () => {
    expect(api).toHaveProperty('play')
    expect(api).toHaveProperty('pause')
    expect(api).toHaveProperty('stop')
    expect(api).toHaveProperty('complete')
    expect(api).toHaveProperty('isBefore')
    expect(api).toHaveProperty('isAfter')
  })

  test('passing a before update function should make sure to update before the first render', () => {
    interface Props {
      in: boolean
    }
    const MyComponent = (props: Props) => {
      ;[state, api] = useSequencer(
        {
          steps: [['one', 100], ['two', 200]]
        },
        ({ play }) => {
          if (props.in === true) {
            play()
          }
        }
      )
      return (
        <div>
          <div>{props.in ? 'in' : 'out'}</div>
          <div>{state.isPlaying ? 'playing' : 'stopped'}</div>
        </div>
      )
    }

    const wrapper = mount(<MyComponent in={false} />)
    expect(wrapper.html()).toBe('<div><div>out</div><div>stopped</div></div>')
    wrapper.setProps({ in: true })
    expect(wrapper.html()).toBe('<div><div>in</div><div>playing</div></div>')
  })
})
