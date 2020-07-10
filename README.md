# React Sequencer

A better way to do animations in React.

**Version 2 now with hooks!**

## Docs

- [Examples (V1)](https://amized.github.io/react-sequencer/)
- [Getting Started](#getting-started)
- [useSequencer](#use-sequencer)
- [API](#options)
- [\<Sequencer\>](#sequencer)

## Overview

React sequencer lets you perform complex animations easily by tying them to a time-sequenced set of states. The simplest usage is to implement the `useSequencer` hook inside your function components, which will give you the sequencer state and an api to control it.

You first define a set of steps for your sequence as tuples of names and durations:

```javascript
const steps = [
  ['initial', 100], 
  ['middle', 100], 
  ['final', 0]
]
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
  let [state, api] = useSequencer({ steps })
  return (
    <div>
      <div>The current step: {state.current}</div>
      <button
        onClick={() => {
          api.play()
        }}
      >
        Start
      </button>
    </div>
  )
}
```

Here `state` contains the sequencer state and `api` provides some methods to control the sequencer. When your sequencer starts playing, it runs through the steps and updates the state on every step, passing the current `name` into `state.current`.

Allowing you to control your time sequenced events in this way has many benefits:

- Easily add / remove or edit your steps from one place in your code
- Have your sequencer trigger css animations, text changes, or whatever you like
- Every step runs in its own animation frame so no repaint or timeout hacks are needed to get your animations behaving exactly as you like
- Add sequencers to multiple components and guarantee that they update in sync

<a name="getting-started"></a>

## Getting started

Install from NPM:

```
npm install react-sequencer
```

<a name="use-sequencer"></a>

## useSequencer()

```typescript
(options: Options) => [SequencerState, SequencerApi]
```

The `useSequencer()` hook takes two parameters:

### options

`options: Options`

A configuration object to initialize the sequencer.

### Returns

The hook returns a tuple of a [SequencerState](#sequencer-state) and [SequencerApi](#sequencer-api).

<a name="options"></a>
## Options

Pass options to `useSequencer`.

### steps

```typescript
steps: Array<[any, number]>
```

Pass an array of tuples that defines the steps of the sequence. The first value should be the name of the step, the second the duration in milliseconds.

```javascript
useSequencer({
  steps: [
  	['initial', 100], 
  	['middle', 100], 
  	['final', 0]
  ]
})
```

If you specify a duration of `0` for a step, it means that the following step will fire on the next animation frame. This guarantees that every state must be visited and rendered before transitioning to the next state.

This is useful for creating an animation 'set up' state where you may want to prepare some css before an animation begins. You can simply do this without needing to change anything else in your sequence:

```javascript
const steps = [
  ['pre', 0], 
  ['initial', 100], 
  ['middle', 100], 
  ['final', 0]
]
```

`pre` becomes the default state when your component mounts, until the sequencer is started, which moves on to `initial` on the next frame. By defining all the states explicitly in this fashion, it becomes easy to insert steps, change durations, swap steps and understand how your animation behaves.

### endMode

```typescript
endMode: 'end' | 'start' | 'loop'
```

The end mode determines the behavior of the sequencer once it reaches the end of the last step.

- **`'end'` (default)**: The sequencer remains in the last step.
- **`'start'`**: The sequencer resets to the first step and becomes idle.
- **`'loop'`**: The sequencer resets to the first step and continues looping until `stop()` or `pause()` is called.

### complete

```typescript
complete: boolean
```

If set to `true`, the sequencer is initialized in the 'completed' state, meaning it is in the final step and idle. It will remain in this state until either `play()` or `stop()` is called.

<a name="sequencer-state"></a>
## Sequencer State

The sequencer state offers the following properties.

### current

```typescript
current: any
```

The current step of the sequencer, as specified by the step names provided in the config. While these examples use a string, you can actually use any type for your names.

### index

```typescript
index: number
```

The index of the current step.

### isPlaying

```typescript
isPlaying: boolean
```

`true` if the sequencer is playing.

### isComplete

```typescript
isComplete: boolean
```

`true` if the sequencer has finished sequencing through the steps and is idle. `endMode` must be set to `end` in order to reach this state.

### isStopped

```typescript
isStopped: boolean
```

`true` if the sequencer is in its first step and not playing.

<a name="sequencer-api"></a>

## Sequencer Api

### isBefore()

```typescript
isBefore(name: string): boolean
```

`true` if the sequencer has not yet reached the step with the provided name.

### isAfter()

```typescript
isAfter(name: string): boolean
```

`true` if the sequencer has passed the step with the provided name.

### play()

```typescript
play(): void
```

Starts the sequencer, or continues playing if the sequencer was paused.

### pause()

```typescript
pause(): void
```

Pauses the sequencer. The sequencer tracks how far it is through the current step by the millisecond so that playback continues from the same moment.

### stop()

```typescript
stop(): void
```

Stops playback and resets the sequencer back to the first step.

### complete()

```typescript
complete(): void
```

Stops playback and puts the sequencer to the end of the final step.

<a name="getting-started"></a>
## Sequencer component

If you prefer you may also use a wrapper component `<Sequencer>` to create a sequencer. Here you pass all the `options` above as props, and you should pass a function as the child component with `state` and `api` as arguments:

```javascript
import { Sequencer } from 'react-sequencer'

const MyComponent = props => {
  return (
  	<Sequencer steps={...} endMode={...} complete={...}>
  	 {
  	   (state, api) => (
  	     <div>The current state is {state.current}</div>
  	   )
  	 }
  	</Sequencer>
  )
}
```
