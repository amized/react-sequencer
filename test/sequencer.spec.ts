/* global describe, it, before */
import Sequencer from '../src/sequencer'
import { PlayStatus, StepsInput } from '../src/types'
import sinon from 'sinon'

let s: Sequencer<any>

describe('Given an instance of my Sequencer library', () => {
  describe('when I initialise the sequence', () => {
    it('the should have a default end mode of "end"', () => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 10],
          ['three', 5],
          ['four', 23],
        ],
      })
      expect(s['endMode']).toEqual('end')
    })

    it('should generate a sequence array', () => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 10],
          ['three', 5],
          ['four', 23],
        ],
      })

      expect(s['steps']).toEqual([
        {
          name: 'one',
          startPos: 0,
          endPos: 0,
        },
        {
          name: 'two',
          startPos: 0,
          endPos: 10,
        },
        {
          name: 'three',
          startPos: 10,
          endPos: 15,
        },
        {
          name: 'four',
          startPos: 15,
          endPos: 38,
        },
      ])
    })
  })

  describe('when I initialise in complete state', () => {
    it('should be in complete state initially', () => {
      const s = new Sequencer({
        steps: [
          ['one', 100],
          ['two', 2000],
        ],
        complete: true,
      })
      expect(s['currentStepIndex']).toEqual(1)
      expect(s['status']).toEqual(PlayStatus.IDLE)
    })
  })

  describe('when I start the sequencer', () => {
    beforeEach(() => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 2000],
        ],
      })
      s.play()
    })

    test('should be in the correct state while playing', (done) => {
      setTimeout(() => {
        const state = s.getState()
        expect(state.isPlaying).toEqual(true)
        expect(state.index).toEqual(1)
        done()
      }, 1000)
    }, 5000)

    test('should be in the correct state when finished', (done) => {
      setTimeout(() => {
        const state = s.getState()
        expect(state.isComplete).toEqual(true)
        expect(state.index).toEqual(1)
        done()
      }, 2100)
    }, 5000)
  })

  describe('when I subscribe to the sequencer', () => {
    test('I should be notified the correct number of times', (done) => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 500],
        ],
        endMode: 'end',
      })
      const spy = sinon.spy(s, 'notifyChange' as any)
      s.play()
      setTimeout(() => {
        expect(spy.callCount).toEqual(3)
        done()
      }, 1000)
    }, 1200)
  })

  describe('isBefore / isAfter', () => {
    test('isBefore() should be true when the sequencer`s current step proceeds the step referenced by the name provided', () => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 10],
          ['three', 20],
        ],
      })
      expect(s.isBefore('two')).toBe(true)
      expect(s.isBefore('one')).toBe(false)
      s['goToStepByIndex'](2)
      expect(s.isBefore('two')).toBe(false)
      expect(s.isBefore('one')).toBe(false)
    })

    test('isAfter() should be true when the step referenced by the name provided proceeds the the sequencer`s current step', () => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 10],
          ['three', 20],
        ],
      })
      expect(s.isAfter('two')).toBe(false)
      expect(s.isAfter('one')).toBe(false)
      s['goToStepByIndex'](2)
      expect(s.isAfter('two')).toBe(true)
      expect(s.isAfter('one')).toBe(true)
    })

    test('a complete sequencer cannot be isAfter() its last step', () => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 10],
          ['three', 20],
        ],
      })
      s.complete()
      expect(s.isAfter('three')).toBe(false)
    })
  })

  describe('when I pause the sequencer', () => {
    beforeEach(() => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 2000],
        ],
      })
      s.play()
      s.pause()
    })

    test('should be in the correct state', (done) => {
      setTimeout(() => {
        const state = s.getState()
        expect(state.isPlaying).toEqual(false)
        expect(state.index).toEqual(0)
        done()
      }, 500)
    }, 5000)
  })

  describe('a complex sequence', () => {
    beforeEach(() => {
      s = new Sequencer({
        steps: [
          ['one', 400],
          ['two', 500],
          ['three', 200],
          ['four', 600],
          ['five', 500],
        ],
      })
      s.play()
    })

    test('should sequence through the correct states', (done) => {
      setTimeout(() => {
        expect(s.getState().index).toEqual(0)
      }, 300)

      setTimeout(() => {
        expect(s.getState().index).toEqual(1)
      }, 500)

      setTimeout(() => {
        expect(s.getState().index).toEqual(2)
      }, 1000)

      setTimeout(() => {
        expect(s.getState().index).toEqual(3)
      }, 1200)

      setTimeout(() => {
        expect(s.getState().index).toEqual(4)
        done()
      }, 1800)
    }, 1900)
  })

  describe('when I run a sequence on loop mode', () => {
    beforeEach(() => {
      s = new Sequencer({
        steps: [
          ['one', 500],
          ['two', 500],
        ],
        loop: true,
      })
      s.play()
    })

    const a = new Sequencer({
      steps: [
        ['one', 500],
        ['two', 500],
      ],
    })

    test('should start the sequence over once test finishes', (done) => {
      setTimeout(() => {
        expect(s.getState().index).toEqual(0)
      }, 250)
      setTimeout(() => {
        expect(s.getState().index).toEqual(1)
      }, 750)
      setTimeout(() => {
        expect(s.getState().index).toEqual(0)
      }, 1250)
      setTimeout(() => {
        expect(s.getState().index).toEqual(1)
        s.stop()
        done()
      }, 1750)
    }, 2000)

    test('should notify correct when looping', (done) => {
      s = new Sequencer({
        steps: [
          ['one', 500],
          ['two', 500],
          ['three', 500],
        ],
        endMode: 'loop',
      })
      const spy = sinon.spy(s, 'notifyChange' as any)
      s.play()
      setTimeout(() => {
        expect(s.getState().index).toEqual(0)
        expect(spy.callCount).toEqual(1)
      }, 250)
      setTimeout(() => {
        expect(s.getState().index).toEqual(1)
        expect(spy.callCount).toEqual(2)
      }, 750)
      setTimeout(() => {
        expect(s.getState().index).toEqual(2)
        expect(spy.callCount).toEqual(3)
      }, 1250)
      setTimeout(() => {
        expect(s.getState().index).toEqual(0)
        expect(spy.callCount).toEqual(4)
        s.stop()
        done()
      }, 1750)
      s.play()
    }, 2000)
  })

  const playModeSequence: StepsInput<any> = [
    ['one', 200],
    ['two', 300],
    ['three', 400],
  ]

  describe('when I set the play mode to', () => {
    test('start, the sequencer should reset to start upon completion', (done) => {
      s = new Sequencer({
        steps: playModeSequence,
        endMode: 'start',
      })
      s.play()
      setTimeout(() => {
        expect(s.getState().index).toEqual(0)
        done()
      }, 1000)
    })

    test('end, the sequencer should hold at end upon completion', (done) => {
      s = new Sequencer({
        steps: playModeSequence,
        endMode: 'end',
      })
      s.play()
      setTimeout(() => {
        expect(s.getState().index).toEqual(2)
        done()
      }, 1000)
    })

    test('loop, the sequencer should continue looping', (done) => {
      s = new Sequencer({
        steps: playModeSequence,
        endMode: 'loop',
      })
      s.play()
      setTimeout(() => {
        expect(s.getState().index).toEqual(1)
        done()
      }, 1300)
    })
  })

  describe('when I subscribe to a sequencer', () => {
    beforeEach(() => {
      s = new Sequencer({
        steps: [
          ['one', 400],
          ['two', 500],
          ['three', 200],
          ['four', 600],
          ['five', 500],
        ],
      })
    })

    test('should notify me when the sequencer state changes', (done) => {
      let updateCount = 0

      s.onChange((seq) => {
        switch (updateCount) {
          case 0:
            expect(seq.current).toEqual('one')
            break
          case 1:
            expect(seq.current).toEqual('two')
            break
          case 2:
            expect(seq.current).toEqual('three')
            break
          case 3:
            expect(seq.current).toEqual('four')
            break
          case 4:
            expect(seq.current).toEqual('five')
            break
          case 5:
            expect(seq.current).toEqual('five')
            expect(seq.isComplete).toEqual(true)
            done()
            break
          default:
            break
        }
        updateCount++
      })

      s.play()
    }, 5000)
  })
  describe('when I call complete() on a sequencer', () => {
    test('it should put the sequencer to the final step', (done) => {
      s = new Sequencer({
        steps: [
          ['one', 500],
          ['two', 500],
          ['three', 0],
        ],
      })
      s.complete()
      expect(s.getState().index).toEqual(2)
      expect(s.getState().current).toEqual('three')
      done()
    })
  })

  describe('when I pass autoplay as an option', () => {
    test('the sequencer should start in play mode', (done) => {
      s = new Sequencer({
        steps: [
          ['one', 500],
          ['two', 500],
          ['three', 0],
        ],
        autoplay: true,
      })
      expect(s.getState().isPlaying).toEqual(true)
      setTimeout(() => {
        expect(s.getState().current).toEqual('two')
        done()
      }, 550)
    })
  })
})
