import React, { Component } from 'react';
import MyComponent from './MyComponent';
import SequencedTitle from './title';

class App extends Component {
  render() {
    return (
      <div>
        Hello

            <iframe src="https://codesandbox.io/embed/l7nljq23v9?module=%2Fsrc%2Fsequenced-title.js"style={{"width":"100%","height":"500px","border":"0","borderRadius":"4px","overflow":"hidden"}}  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
        <MyComponent/>
        <SequencedTitle/>
      </div>
    );
  }
}

export default App;
