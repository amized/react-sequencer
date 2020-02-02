# React Sequencer

A better way to do animations in React.

**Version 2 now with hooks!**

## Docs

- [Examples](https://amized.github.io/react-sequencer/)
- [Getting Started](#getting-started)
- [withSequencer](#use-sequencer)

## Overview

React sequencer lets you perform complex animations easily by tying them to a time-sequenced set of states. The simplest usage is to implement the `useSequencer` hook inside your function components, which will give you the sequencer state and an api to control it.

You first define a set of steps for your sequence as tuples of names and durations:

```javascript
;[['initial', 100], ['middle', 100], ['final', 0]]
```

Then pass this as configuration to useSequencer:

```javascript
import { useSequencer } from 'react-sequencer'

const steps = [
  ['initial', 100],
  ['middle', 100],
  ['final', 0]
]

const MyComponent = props => {
  let [state, api] = useSequencer({steps});
  return (
	<div>
	  <div>The current step: { state.current }</div>
	  <button onClick={() => { api.play(); }}>Start</button>
	</div>
  );
```

Here `state` contains the sequencer state and `api` provides some methods to control the sequencer. When your sequencer starts playing, it runs through the steps and updates the state on every step, passing the current `name` into `state.current`.

Allowing you to control your time sequenced events in this way has many benefits:

- Easily add / remove or edit your steps from one place in your code
- Have your sequencer trigger css animations, text changes, or whatever you like
- Every step runs in its own animation frame so no repaint or timeout hacks are needed to get your animations behaving exactly as you like
- Add sequencers to multiple components and guarantee that they update in sync

See [examples](https://amized.github.io/react-sequencer/).

<a name="getting-started"></a>

## Getting started

Install from NPM:

```
npm install react-sequencer
```

<a name="use-sequencer"></a>

## useSequencer

#### `(options: Options, onBeforeRender: Function) => [state, api]`

### Arguments

#### `options: Options`

A configuration object to initialize the sequencer.

#### `onBeforeRender: (api: SequencerApi) => void`

A function you pass to update the sequencer in response to a change in props or state. Your function is passed the sequencer api as an argument, allowing you to call `play`, `pause`, `stop` or `complete`. The advantage of updating the state here is that your state/props and the sequencer state are rendered perfectly in sync, allowing to design animations with precision.

### Options

Pass options to `useSequencer`.

#### `steps: Array` [required]

Pass an array of tuples that defines the steps of the sequence. The first value should be the name of the step, the second the duration in milliseconds.

```javascript
useSequencer({
  steps: [['initial', 100], ['middle', 100], ['final', 0]]
})
```

If you specify a duration of `0` for a step, it means that the following step will fire on the next animation frame. This guarantees that every state must be visited and rendered before transitioning to the next state.

This is useful for creating an animation 'set up' state where you may want to prepare some css before an animation begins. You can simply do this without needing to change anything else in your sequence:

```javascript
;[['pre', 0], ['initial', 100], ['middle', 100], ['final', 0]]
```

`pre` becomes the default state when your component mounts, until the sequencer is started, which moves on to `initial` on the next frame. By defining all the states explicitly in this fashion, it becomes easy to insert steps, change durations, swap steps and understand how your animation behaves.

#### `endMode: 'end' | 'start' | 'loop'`

The end mode determines the behavior of the sequencer once it reaches the end of the last step.

- **`'end'` (default)**: The sequencer remains in the last step.
- **`'start'`**: The sequencer resets to the first step and becomes idle.
- **`'loop'`**: The sequencer resets to the first step and continues looping until `stop()` or `pause()` is called.

#### `complete: Boolean`

If set to `true`, the sequencer is initialized in the 'completed' state, meaning it is in the final step and idle. It will remain in this state until either `play()` or `stop()` is called.

### Sequencer State

The sequencer state offer the following properties.

#### `current: String`

The current step of the sequencer, as specified by the step names provided in the config.

#### `index: Number`

The index of the current step.

#### `isPlaying: Boolean`

`true` if the sequencer is playing.

#### `isComplete: Boolean`

`true` if the sequencer has finished sequencing through the steps and is idle. `endMode` must be set to `end` in order to reach this state.

#### `isStopped: Boolean`

`true` if the sequencer is in its first step and not playing.

### Sequencer Api

#### `isBefore(name): Boolean`

`true` if the sequencer has not yet reached the step with the provided name.

#### `isAfter(name): Boolean`

`true` if the sequencer has passed the step with the provided name.

#### `play(): Function`

Starts the sequencer, or continues playing if the sequencer was paused.

#### `pause(): Function`

Pauses the sequencer. The sequencer tracks how far it is through the current step by the millisecond so that playback continues from the same moment.

#### `stop(): Function`

Stops playback and resets the sequencer back to the first step.

#### `complete(): Function`

Stops playback and puts the sequencer to the end of the final step.
