import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GraphContainer from './containers/GraphContainer'
import LayerShelf from './components/LayerShelf'

import 'tachyons'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App w-100 vh-100 overflow-hidden">
        <div className="w-20 h-100 dib">
          <LayerShelf />
        </div>
        <div className="w-80 bg-near-white h-100 dib v-top">
          <GraphContainer />
          <div className="w-100 v-mid tc">
            <h1 className="App-logo bg-purple v-mid f-headline lh-solid">KerasUI</h1>
          </div>
        </div>
      </div>
    )
  }
}
const DragApp = DragDropContext(HTML5Backend)(App);

export default DragApp 
