import { useState, useEffect, useRef } from 'react'
import Sequencer from './sequencer'
import { WithSequencerProps, SequencerState, OptionsInput } from './types'

/**
 * @param options  OptionsInput
 * @typeparam OptionsInput  Comment for type `OptionsInput`.
 */
function useSequencer<TStepName extends string>(
  options: OptionsInput<TStepName>
) {
  const { steps, loop, complete, endMode } = options
  const sequencerRef = useRef(
    new Sequencer<TStepName>({ steps, loop, complete, endMode })
  )
  const [, setSequencer] = useState<SequencerState>(
    sequencerRef.current.getState()
  )
  useEffect(() => {
    function handleStateChange(sequencerState: SequencerState) {
      setSequencer(sequencerState)
    }
    return sequencerRef.current.onChange(handleStateChange)
  }, [])
  const {
    current,
    index,
    isComplete,
    isPlaying
  } = sequencerRef.current.getState()
  const { play, pause, stop, isBefore, isAfter } = sequencerRef.current

  return {
    current,
    index,
    isComplete,
    isPlaying,
    play,
    pause,
    stop,
    complete: sequencerRef.current.complete,
    isBefore,
    isAfter
  }
}

export default useSequencer
