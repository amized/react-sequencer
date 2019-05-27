import React, { Component } from 'react';
import Fader from './fader';

export default class FaderExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  handleToggle = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    return (
      <div>
        <Fader>
          {
            this.state.isEditing ?
              <div key={1}>Edittting!!!</div> : <div key={2}><div>Not</div>Edittting</div>
          }
        </Fader>
        <button onClick={this.handleToggle}>Toggle</button>
      </div>
    );

  }
}
