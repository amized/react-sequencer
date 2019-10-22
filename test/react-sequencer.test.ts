import { withSequencer } from '../src'

describe('React sequencer', () => {
  it('should export the withSequencer HOC', () => {
    expect(typeof withSequencer).toBe('function')
  })
})
