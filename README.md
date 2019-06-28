# React Sequencer

A better way to do animations in React.

## Docs

- [Examples](https://amized.github.io/react-sequencer/)
- [Getting Started](#getting-started)
- [Transition](#transition)
- [withSequencer](#with-sequencer)

## Overview

React sequencer lets you perform complex animations easily by tying them to a time-sequenced set of states. The simplest usage is to wrap your component with the `withSequencer` HOC, which will inject the sequencer state into your component.

You first define a set of steps for your sequence as tuples of names and durations:

```javascript
[
  ['initial', 100], 
  ['middle', 100], 
  ['final', 0]
]
```
Then pass this as configuration to withSequencer and wrap your component:

```javascript
withSequencer({
  steps: [
    ['initial', 100], 
    ['middle', 100], 
    ['final', 0]]
})(MyComponent)
```

Your wrapped component receives a `sequencer` object as a prop that contains the sequencer state and some methods to control the sequencer. When your sequencer stats playing, it runs through the steps and updates the state on every step, passing the current `name` into `sequencer.current`:

```javascript
const MyComponent = () => {
  const { current, play } = this.props.sequencer
  return (
    <div className={`show-${current}`}>
      <div>The sequencer state: {current}</div>
      <button onClick={play}>Start</button>
    </div>
  )
}
```

Allowing you to control your time sequenced events in this way has many benefits:

* Easily add / remove or edit your steps from one place in your code
* Have your sequencer trigger css animations, text changes, or whatever you like
* Every step runs in its own animation frame so no repaint or timeout hacks are needed to get your animations behaving exactly as you like
* Add sequencers to multiple components and guarantee that they update in sync

See [examples](https://amized.github.io/react-sequencer/).

<a name="getting-started"></a>

## Getting started

Install from NPM:

```
npm install react-sequencer
```

<a name="with-sequencer"></a>

## `withSequencer(config: Object)`

### Configuration properties

Pass an options object to `withSequencer` to configure your sequencer. Note that all of these configuration properties can also be passed as props into your component from its parent.

#### `steps: Array` [required]

Pass an array of tuples that defines the steps of the sequence. The first value should be the name of the step, the second the duration in milliseconds.

```javascript
withSequencer({
  steps: [
  	['initial', 100], 
  	['middle', 100], 
  	['final', 0]
  ]
})(MyComponent)
```

If you specify a duration of `0` for a step, it means that the following step will fire on the next animation frame. This guarantees that every state must be visited and rendered before transitioning to the next state.

This is a useful animation tool, since let's say you'd like a different initial state for an animation before it starts without needing to re configure all the steps, you can simply do this:

```javascript
[
  ['pre', 0], 
  ['initial', 100], 
  ['middle', 100], 
  ['final', 0]
]
```

And then `pre` becomes the default state when your component mounts, until the sequencer is started. By defining all the states explicitly in this fashion, it becomes easy to insert steps, change durations, swap steps and understand how your animation behaves.

#### `endMode: 'end' | 'start' | 'loop'`

The end mode determines the behavior of the sequencer once it reaches the end of the last step.

* **`'end'` (default)**: The sequencer remains in the last step and becomes idle.
* **`'start'`**: The sequencer resets to the first step and becomes idle.
* **`'loop'`**: The sequencer resets to the first step and continues looping until `stop()` or `pause()` is called.

#### `complete: Boolean`

If set to `true`, the sequencer is initialized in the 'completed' state, meaning it is in the final step and idle. It will remain in this state until either `play()` or `stop()` is called.

#### `shouldPlayOnUpdate(currentProps, nextProps): Boolean`

A function you provide that allows you to start playing the sequencer in response to a change in props. The return value should be `true` to begin playing, `false` otherwise.

#### `shouldStopOnUpdate(currentProps, nextProps): Boolean`

A function you provide that allows you to stop playing the sequencer in response to a change in props. The return value should be `true` to stop playing, `false` otherwise.

#### `shouldCompleteOnUpdate(currentProps, nextProps): Boolean`

A function you provide that allows you to complete the sequencer in response to a change in props, meaning putting the sequencer in it's completed state. The return value should be `true` to complete, `false` otherwise.

## Props

`withSequencer` will inject a single prop into your wrapped component, `sequencer`. This object has the following properties:

### State Props

#### `sequencer.current: String`

The current step of the sequencer, as specified by the step names provided in the config.

#### `sequencer.index: Number`

The index of the current step.

#### `sequencer.isPlaying: Boolean`

`true` if the sequencer is playing.

#### `sequencer.isComplete: Boolean`

`true` if the sequencer has finished sequencing through the steps and is idle. `endMode` must be set to `'end'` in order to reach this state.

### API Props

#### `sequencer.play(): Function`

Starts the sequencer, or continues playing if the sequencer was paused. If this is called when the sequencer is in a `complete` state, it will jump back to the start and begin playing.

#### `sequencer.pause(): Function`

Pauses the sequencer. The sequencer remembers how far through the current step you are so that playback continues from that point rather than replaying the current step from the beginning.

#### `sequencer.stop(): Function`

Stops playback and resets the sequencer back to the first step.

<a name="transition"></a>

## `<Transition>`

`Transition` is a wrapper component to help make in/out transitions easy to manage. The concept is loosely based off the React Transition Group `<Transition>`, but uses Sequencers as the machinery and remains un-opinionated about how you render the state.

### Usage

To use the Transition component you must define a sequence for the `in` phase, and optionally for the `out` phase. For this we use the structure mentioned in the overview:

```javascript
/* Define the sequence for when the component enters */
const inSteps = [['enter-start', 0][('enter-active', 500)], ['in', 100]]

/* Define the sequence for when the component leaves */
const outSteps = [['leave-start', 0], ['leave-active', 500], ['out', 100]]
```

We then pass those arrays to our Transition component.

```javascript
import { Transition } from 'react-sequencer'

const Fade = props => (
  <Transition inSteps={inSteps} outSteps={outSteps} in={props.in}>
    {current => <div style={getStyle(current)}>{props.children}</div>}
  </Transition>
)
```

The child passed to a Transition must be a function which receives the `current` argument - this holds the stepName of the current step. This example uses React's `style` attribute to render out the animation, but you could implement the animation how ever you like - using styled components, classNames, or other graphics libraries.

```javascript
const getStyle = current => {
  switch(current) {
    case 'enter-start':
      return {
        opacity: 0
      };
    case 'enter-active':
    case 'in':
      return {
        opacity: 1
      };
    ...
  }
}

```

We can now use `Fade` in our app to fade its children in and out.

```javascript
/* Usage in higher level component */
...
<Fade in={this.state.in}>
  My content
</Fade>
...
```

#### Notes

When the `in` prop of your Transition becomes `true`, it begins playing the `inSteps` until the sequencer completes. At that point it stays idle in the final step of that sequencer. When `in` becomes false, it plays the `outSteps` sequencer and behaves the same way. If in becomes true while the out sequencer is playing, or vice versa, it interrupts the current sequencer and starts playing the new sequencer from the start.

We recommend to name the final steps for each transition as `in` and `out` to make it clear that those are the states that the component remains in after the transition finishes.

### Props

Props that you pass to `<Transition>` to configure the behavior.

#### `in: Boolean`

Toggles the component in and out.

#### `inSteps: Array` [required]

Sequence to perform when `in` becomes `true`.

#### `outSteps: Array`

Sequence to perform when `in` becomes `false`.

#### `runOnMount: Boolean`

Whether or not to run the `in` sequence when the component mounts.

#### `unmountOnExit: Boolean`

If set to true, the child element is removed from the dom when the `out` sequence gets to a completed state. Note that your component will remain mounted for the duration of the last step before unmounting.

### Injected Props

#### `current: String`

Your wrapped component gets passed the step name of the current step of either the `in` Sequencer or the `out` Sequencer.


