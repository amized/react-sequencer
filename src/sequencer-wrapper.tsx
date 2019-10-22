import React, { ReactElement } from 'react'
import withSequencer from './with-sequencer'
import { SequencerState, SequencerApi, InjectedProps } from './types'

interface Props extends InjectedProps {
  children(sequencer: SequencerApi & SequencerState): ReactElement
}

const SequencerWrapper: React.FunctionComponent<Props> = ({
  children,
  sequencer
}) => children(sequencer)

export default withSequencer()(SequencerWrapper)
