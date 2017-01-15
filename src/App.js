import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GraphStore from './stores/GraphStore.js'
import GraphContainer from './containers/GraphContainer'
import LayerShelf from './components/LayerShelf'
import LayerDragPreview from './components/LayerDragPreview'


import 'tachyons'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    const store = GraphStore;
  }

  render() {
    return (
      <div className="App w-100 vh-100 overflow-hidden">
        <div className="h-100 dib">
          <LayerShelf />
        </div>
        <div className="w-100 bg-near-white h-100 dib v-top absolute">
          <GraphContainer model={GraphStore}/>
          <div className="Logo-Container w-100 v-mid tc">
            <h1 className="App-logo bg-purple f-headline lh-solid">KerasUI</h1>
          </div>
        </div>
        <LayerDragPreview />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
 
