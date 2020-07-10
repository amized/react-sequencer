import { useState, useEffect, useRef } from 'react'
import Sequencer from './sequencer'
import { SequencerState, OptionsInput, TUseSequencer } from './types'

function useSequencer<TStepName>(
  options: OptionsInput<TStepName>
): TUseSequencer<TStepName> {
  const sequencerRef = useRef(new Sequencer<TStepName>(options))
  const sequencerApi = useRef(sequencerRef.current.getApi())
  const [sequencerState, setSequencer] = useState<SequencerState<TStepName>>(
    sequencerRef.current.getState()
  )
  useEffect(() => {
    function handleStateChange(sequencerState: SequencerState<TStepName>) {
      setSequencer(sequencerState)
    }
    return sequencerRef.current.onChange(handleStateChange)
  }, [])
  return [sequencerState, sequencerApi.current]
}

export default useSequencer
