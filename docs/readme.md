# React Sequencer

A better way to do animations in React.

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
* The sequencer needs to be started (through the API) to begin sequencing through the steps. When this happens the sequencer remains in `initial` for another 100ms.
* The sequencer then transitions to `middle` and stays there for 100ms.
* It then transitions to `final` and stays there for 200ms.
* After the 200ms is up the sequencer remains in `final` until you reset it.

<img src="https://user-images.githubusercontent.com/13376866/42727760-04eade32-877a-11e8-9d2c-22850977b486.png" alt="drawing" width="600px" style="margin: 40px 0px;"/>

The idea here is that you get a simple, easily configurable, non-ambiguous state machine and api to control your animations. The state is passed to your component and it's totally up to you how you render it - whether it's through css animation, className animation or a graphics library.