import React, { Component } from 'react';
import MyComponent from './MyComponent';
import SequencedTitle from './title';
import TransitionExample from './transition-example';

class App extends Component {
  render() {
    return (
      <div>
        Hello
        <MyComponent/>
        <SequencedTitle/>
        <TransitionExample/>
      </div>
    );
  }
}

export default App;
