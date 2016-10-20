import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLayer } from './actions'

import 'tachyons'
import './App.css'

import Graph from './components/Graph'

class App extends Component {
  render() {
    return (
      <div className="App w-100 vh-100 dt">
				<div className="w-100 dtc v-mid tc white ph3 ph4-l">
					<h1 className="App-logo bg-purple v-mid f-headline lh-solid">KerasUI</h1>
				</div> 
        <a 
          className="f6 link dim br2 ba ph3 pv2 mb2 dib near-black" 
          onClick={(e) => { e.preventDefault(); return this.props.onAddLayer("Dense") }}
          href="">Button Text</a>
        <Graph graph={this.props.graph}/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

