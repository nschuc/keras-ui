import React, { Component } from 'react';
import 'tachyons';
import './App.css';

import * as graph from './pretty.json';
import Graph from './components/Graph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Graph graph={graph}/>
        </div>
      </div>
    );
  }
}

export default App;
