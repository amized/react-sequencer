# React Sequencer

A better way to do animations in React.

## Docs

- [Examples](https://amized.github.io/react-sequencer/)
- [Getting Started](#getting-started)
- [Transition](#transition)
- [withSequencer](#with-sequencer)



## Overview

React Sequencer gives you a step-based sequencer that transitions through any number of steps with indivdual durations. You can inject your components with the state of the sequencer in order to perform animations, transitions, music, or any complex time-sequenced set of events.

When you create a sequencer you will pass in a configuration array to tell it what the steps are:

```javascript
[
  ['initial', 100],
  ['middle', 100],
  ['final', 200]
]
```

To explain how the sequencer behaves, consider the example above.

* A sequencer is *always* in one of your provided states at any time, so when the sequencer is initialized it starts in the first step `initial`
* When the sequencer starts playing, it remains in `initial` for another 100ms.
* The sequencer then transitions to `middle` and stays there for 100ms.
* It then transitions to `final` and stays there for 200ms.
* After the 200ms is up the sequencer remains in `final` until you reset it.

<img src="https://user-images.githubusercontent.com/13376866/42727760-04eade32-877a-11e8-9d2c-22850977b486.png" alt="drawing" width="600px" style="margin: 40px 0px;"/>

### Why use React Sequencer?

The idea here is that you get a simple, easily configurable, non-ambiguous and reliable state machine to control your animations. The state is passed to your components for you to render how you like. This gives a bunch of advantages:

1. You have full control over the steps and durations of your sequence
2. You can render out your animations in any implementation you choose - css classes, styled components, 3rd party animation libraries etc.
3. The configuration structure makes it easy to change durations, insert/delete steps and perfect your sequences without needing to update other parts of your app
4. Every step in your sequence runs in it's own animationFrame. This means every step is guaranteed to be rendered in the browser before proceeding to the next state - no timeout or repaint hacks needed
5. You can synchronize two sequencers just by starting them in the same block of code, and this allows you to do some pretty cool stuff (see examples)

<a name="getting-started"></a>
## Getting started
Install from NPM:

```
npm install react-sequencer
```

<a name="transition"></a>
## `<Transition>`

`Transition` is a wrapper component to help make in/out transitions easy to manage. The concept is losely based off the React Transition Group `<Transition>`, but uses Sequencers as the machinery and remains unopinionated about how you render the state.

### Usage

To use the Transition component you must define a sequence for the `in` phase, and optionally for the `out` phase. For this we use the structure mentioned in the overview:

```javascript
/* Define the sequence for when the component enters */
const inSteps = [
  ['enter-start', 0]
  ['enter-active', 500],
  ['in', 100]
]

/* Define the sequence for when the component leaves */
const outSteps = [
  ['leave-start', 0],
  ['leave-active', 500],
  ['out', 100]
]
```
We then pass those arrays to our Transition component.

```javascript
import {Transition} from 'react-sequencer';

const Fade = props => (
  <Transition
    inSteps={inSteps}
    outSteps={outSteps}
    in={props.in}
  >
    {
      current => (
        <div style={getStyle(current)}>
          {props.children}
        </div>
      )
    }
  </Transition>
);
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

#### `runOnMount: Boolean `

Whether or not to run the `in` sequence when the component mounts.

#### `unmountOnExit: Boolean `

If set to true, the child element is removed from the dom when the `out` sequence gets to a completed state. Note that your component will remain mounted for the duration of the last step before unmounting.

### Injected Props

#### `current: String `
Your wrapped component gets passed the step name of the current step of either the `in` Sequencer or the `out` Sequencer.

<a name="with-sequencer"></a>
##  `withSequencer`

For lower level usage you can wrap your component with the `withSequencer` HOC.

```javascript
import {withSequencer} from 'react-sequencer';

class MyComponent extends React.Component {
  render() {
    const {current, play} = this.props.sequencer;
    return (
      <div className={current}>
        <div>
          The sequencer state: {current}
        </div>
        <button onClick={play}>Start</button>
      </div>
    );
  }
}

export default withSequencer({
  steps: [
    ['initial', 100],
    ['middle', 100],
    ['final', 0]
  ]
})(MyComponent);
```

Your component then receives a `sequencer` object as a prop that contains the sequencer state and some methods to control the sequencer.

### Configuration

Pass an options object to `withSequencer` to configure your sequencer.

#### `steps: Array` [required]

Pass an array of tuples that defines the steps of the sequence and their transition times.

```javascript
withSequencer({
  steps: [
    ['initial', 100],
    ['middle', 100],
    ['final', 0]
  ]
})(MyComponent);
```

If you specify a duration of `0ms` for a step, it means that the following step will fire on the next animation frame. This guarantees that every state must be visited and rendered before transitioning to the next state.

This is a useful animation tool, since let's say you'd like a different initial state for an animation before it starts, but you don't want to effect the rest of the sequence. You can simply do this:

```javascript
[
  ['pre', 0],
  ['initial', 100],
  ['middle', 100],
  ['final', 0]
]
```

And then `pre` becomes the default state when your component mounts, until the sequencer is started. By defining all the states explicitly in this fashion, it becomes easy to insert steps, change durations, swap steps and generally understand how your animation behaves.

#### `loop: Boolean`

Put the sequencer in loop mode. In loop mode, the sequencer jumps to the first step when it finishes the final step. Default is `false`.

#### `complete: Boolean`

If set to `true`, the state of the sequencer will be set to the end of the final step and idle when the component is initialised. Default is `false`.

#### `shouldPlayOnUpdate(currentProps, nextProps): Boolean`

A function you provide that allows you to start playing the sequencer in response to a change in props. The benefit of responding to props here rather than in your wrapped component is that the state change of the sequencer happens in the same render cycle as the props change. The return value should be `true` to begin playing, `false` otherwise.

#### `shouldStopOnUpdate(currentProps, nextProps): Boolean`

A function you provide that allows you to stop playing the sequencer in response to a change in props. The return value should be `true` to stop playing, `false` otherwise.

#### `shouldCompleteOnUpdate(currentProps, nextProps): Boolean`

A function you provide that allows you to complete the sequencer in response to a change in props, meaning putting the sequencer in it's completed state. The return value should be `true` to complete, `false` otherwise.


### Props

The `sequencer` prop passed to your wrapped component has the following properties:

### State Props

#### `sequencer.current: String`

The current step of the sequencer, as specified by the step names provided to the sequencer.

#### `sequencer.index: Number`

The index of the current step.

#### `sequencer.isPlaying: Boolean`

`true` if the sequencer is playing.

#### `sequencer.isComplete: Boolean`

`true` if the sequencer has finished sequencing through the steps and is idle. If the sequencer is in `loop` mode this will never be true.



### API Props

#### `sequencer.play(): Function`

Starts the sequencer, or continues playing if the sequencer was paused. If this is called when the sequencer is in a `complete` state, it will jump back to the start and begin playing. 

#### `sequencer.pause(): Function`

Pauses the sequencer. The sequencer remembers how far through the current step you are so that playback continues from that point rather than replaying the current step from the beggining.

#### `sequencer.stop(): Function`

Stops playback and resets the sequencer back to the first step.

