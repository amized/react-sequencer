import { useState, useEffect, useRef } from 'react'
import Sequencer from './sequencer'
import {
  SequencerState,
  OptionsInput,
  SequencerApi,
  TUseSequencer
} from './types'

function useSequencer<TStepName extends string>(
  options: OptionsInput<TStepName>,
  beforeUpdate?: {
    (api: SequencerApi): void
  }
): TUseSequencer<TStepName> {
  const sequencerRef = useRef(new Sequencer<TStepName>(options))

  if (beforeUpdate) {
    beforeUpdate(sequencerRef.current.getApi())
  }

  const [_, setSequencer] = useState<SequencerState>(
    sequencerRef.current.getState()
  )
  useEffect(() => {
    function handleStateChange(sequencerState: SequencerState) {
      setSequencer(sequencerState)
    }
    return sequencerRef.current.onChange(handleStateChange)
  }, [sequencerRef])
  const sequencerState = sequencerRef.current.getState()
  const sequencerApi = sequencerRef.current.getApi()

  return [sequencerState, sequencerApi]
}

export default useSequencer
