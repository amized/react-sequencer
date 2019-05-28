import { withSequencer } from '../src/react-sequencer'

describe('React sequencer', () => {
  it('should export the withSequencer HOC', () => {
    expect(typeof withSequencer).toBe('function')
  })
})
