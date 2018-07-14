import React, { Component } from 'react';
import MyComponent from './MyComponent';
import SequencedTitle from './title';

class App extends Component {
  render() {
    return (
      <div>
        Hello
        <MyComponent/>
        <SequencedTitle/>
      </div>
    );
  }
}

export default App;
