import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
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

  test('state should have the correct starting step', () => {
    expect(state.current).toEqual('one')
  })

  test('state should change when I call play', done => {
    const initialState = state
    expect(state.isPlaying).toEqual(false)
    act(() => {
      api.play()
    })
    setTimeout(() => {
      expect(initialState === state).toEqual(false)
      expect(state.isPlaying).toEqual(true)
      done()
    }, 100)
  })
})
