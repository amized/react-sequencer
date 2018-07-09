# React Sequencer

A better way to do animations in React.

## Overview

React Sequencer sets up a a step based sequencer that transitions through any number of steps with indivdual durations. When you create a sequencer you will pass in a configuration array to tell it what the steps are:

```
[
  ['initial', 100],
  ['middle', 100],
  ['final', 200]
]
```

To explain how the sequencer behaves, consider the example above.

* A sequencer is always in one of your provided states at any time, so when the sequencer is initialized it starts in the first step `initial`
* The sequencer needs to be started (through the API) to begin sequencing through the steps. When this happens the sequencer remains in `inital` for another 100ms.
* The sequencer then transitions to `middle` and stays there for 100ms.
* Finally the sequencer transition to `final` and stays there for 200ms.
* After the 200ms is up the sequencer remains in `final` until you reset it. Your component will recieve another flag `isComplete` (see below) to indicate the complete state of the sequencer.

The idea here is that you get a simple, easily-configurable, non-ambiguous state machine and api to control your animation state - and it's totally up to you how you render that state. Whether it's through css animation, className animation or use of an external graphics library, you handle that side of things.


## Getting started

```
npm install react-sequencer
```

Inject your component with sequencer state by wrapping it in the `withSequencer` HOC.

```javascript
import { withSequencer } from 'react-sequencer';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <div>This is the sequence state: {this.props.sequencer.current}</div>
        <button onClick={this.props.sequencer.start}>Start</button>
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


## Options

###`withSequencer({...options})(MyComponent)`

Pass an options object to `withSequencer` to set up your sequencer.

#### `steps: Array` [required]

Pass an array of tuples that configures the ordered steps of the sequence and their transition times.

```javascript
withSequencer({
  steps: [
    ['initial', 100],
    ['middle', 100],
    ['final', 0]
  ]
})(MyComponent);
```

A few things to note about the behavior:

* When your component is mounted the sequencer always starts on the first step whether playing or not. 
* When the sequencer finishes, it remains on the final step indefinately until it begins again. 
* If in loop mode, the sequencer jumps to the first step after it finishes.

#### `loop: Boolean` 

Put the sequencer in loop mode. In loop mode, the sequencer jumps to the first step when it finishes the final step. Default is `false`.


## Props

When you wrap your component with `withSequencer` a `sequencer` object gets passed as a prop into your component. This object contains both the state of the sequencer and some API methods to control it.

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

#### `sequencer.start(): Function`

Starts the sequencer, or continues playing if the sequencer was paused.

#### `sequencer.pause(): Function`

Pauses the sequencer. The sequencer remembers how far through the current step you are so that playback continues from that point rather than replaying the current step from the beggining.

#### `sequencer.stop(): Function`

Stops playback and resets the sequencr back to the first step.

-------


# `<Transition>`

`Transition` is a wrapper component to help make in/out transitions easy to manage. The concept is losely based off the React Transition Group `<Transition>`, but uses Sequencers as the machinery and remains unopionated about render.  

### Usage

```javascript
import {Transition} from 'react-sequencer';

/* Define the sequence for when the component enters */
const inSteps = [
  ['enter-start', 0]
  ['enter-active', 500],
  ['entered', 100]
]

/* Define the sequence for when the component leaves */
const outSteps = [
  ['entered', 0],
  ['leave-start', 0],
  ['leave-active', 500],
  ['gone', 100]
]

<Transition
  inSteps={inSteps}
  outSteps={outSteps}
  in={true}
>
  <MyComponent/>
</Transition>
```

In the example above, `MyComponent` gets injected with a `current` prop to indicate the current step. You can also pass a function to get access to the state from your top level component. You could then do what you please with the state:

```javascript
const getStyle = current => {
  switch(current) {
    case 'enter-start':
      return {
        opacity: 0
      };
    case 'enter-active':
    case 'enter-entered':
      return {
        opacity: 1
      };
    ...
  }
}

const MyComponent = props => (
  <div style={getStyle(props.current)}>
	...
  </div>
);

```

## Props

Props that you pass to `<Transition>` to configure the behavior.

#### `in: Boolean`

Toggles the component in and out.

#### `inSteps: Array` [required]

Sequence to perform when `in` becomes `true`.

#### `outSteps: Array` [required]

Sequence to perform when `in` becomes `false`.

#### `runOnMount: Boolean `

Whether or not to run the 'in' sequence when the component mounts.

#### `unmountOnExit: Boolean `

If set to true, the child element is removed from the dom when the sequence gets to completed state. Note that your component will remain the duration of the last step before unmounting.

## Injected Props

#### `current: String `
Your wrapped component gets passed the step name of the current step of either the In Sequence or the Out Sequence.






