import React, { ReactElement } from 'react'
import useSequencer from './use-sequencer'
import { SequencerState, SequencerApi, OptionsInput } from './types'

interface Props<TStepName> extends OptionsInput<TStepName> {
  children(
    state: SequencerState<TStepName>,
    api: SequencerApi<TStepName>
  ): ReactElement
}

const SequencerWrapper = function<TStepName>(props: Props<TStepName>) {
  const { children, ...options } = props
  const [state, api] = useSequencer(options)
  return children(state, api)
}

export default SequencerWrapper
