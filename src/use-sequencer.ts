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
  const sequencerApi = sequencerRef.current.getApi()

  if (beforeUpdate) {
    beforeUpdate(sequencerApi)
  }

  const sequencerState = sequencerRef.current.getState()
  const [_, setSequencer] = useState<SequencerState>(sequencerState)

  useEffect(() => {
    function handleStateChange(sequencerState: SequencerState) {
      setSequencer(sequencerState)
    }
    return sequencerRef.current.onChange(handleStateChange)
  }, [sequencerRef])

  return [sequencerState, sequencerApi]
}

export default useSequencer
