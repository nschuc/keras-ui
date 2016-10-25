import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLayer } from './actions'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import 'tachyons'
import './App.css'

import Graph from './components/Graph'
import LayerShelf from './components/LayerShelf'

class App extends Component {
  render() {
    return (
      <div className="App w-100 vh-100">
        <div className="w-20 h-100 dib">
          <LayerShelf />
        </div>
        <div className="w-80 bg-near-white h-100 dib v-top">
          <Graph graph={this.props.graph}/>
          <div className="w-100 v-mid tc">
            <h1 className="App-logo bg-purple v-mid f-headline lh-solid">KerasUI</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    graph: state.graph
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddLayer: (type) => dispatch(addLayer(type))
  }
}

const DragApp = DragDropContext(HTML5Backend)(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragApp)

