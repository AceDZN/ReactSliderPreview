import React, { Component } from 'react';
import './App.css';

import SlidesPlayer from './containers/SlidesPlayer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <SlidesPlayer />
        </div>
      </div>
    );
  }
}

export default App;
