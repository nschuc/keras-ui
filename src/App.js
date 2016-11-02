import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GraphContainer from './containers/GraphContainer'
import LayerShelf from './components/LayerShelf'
import LayerDragPreview from './components/LayerDragPreview'

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
          <div className="Logo-Container w-80 v-mid tc">
            <h1 className="App-logo bg-purple v-mid f-headline lh-solid">KerasUI</h1>
          </div>
        </div>
        <LayerDragPreview />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
 
