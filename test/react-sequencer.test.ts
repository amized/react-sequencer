import { Sequencer, useSequencer } from '../src'

describe('React sequencer', () => {
  it('should export the Sequencer wrapper component', () => {
    expect(typeof Sequencer).toBe('function')
  })
  it('should export the Sequencer hook', () => {
    expect(typeof useSequencer).toBe('function')
  })
})
