import React, { Component } from 'react'
import * as dagre from 'dagre'

import { connect } from 'react-redux'
import { addLayer, previewLayerAdd } from '../actions/index'

import Graph from '../components/Graph'
 
class GraphContainer extends Component {

  constructor(props) {
    super(props)
    this.graph = this.buildDirectedGraph(props.model.layers)
    this.state = {}
  }

  // Keep track of layer sizes so we can properly layout dag
  setLayerSize = (ref, name) => {
    if(ref) {
      this.graph.node(name).width = ref.clientWidth
      this.graph.node(name).height = ref.clientHeight
    }
  }

  onLayerHover = (dragged, target) => {
    const layers = this.props.model.layers
    if(layers._temp &&
      target.name === layers._temp.inbound_nodes[0]){
        return
    }
    this.props.onLayerHover(dragged, target)
  }

	buildDirectedGraph = (layers) => {
		// Create a new directed graph 
		var g = new dagre.graphlib.Graph()

		// Set an object for the graph label
    g.setGraph({
      rankdir: 'LR',
      nodesep: 100,
      marginx: 100,
      marginy: 100
    })

    // Generate labels for edges
    g.setDefaultEdgeLabel((v, w) => 
      { 
        return {
          label: v + '__' + w 
        }
      })

		// Add all nodes first
    Object.keys(layers).forEach( name => {
      const layer = layers[name]
      if(!layer || g.node(layer.name)) return

      g.setNode(layer.name, { 
        layer, 
        width: 100, 
        height: 50,
        dx: 0,
        dy: 0
      })
    })

    // Add all edges
    Object.keys(layers).forEach( name => {
      const layer = layers[name]
      if(!layer) return
      layer.inbound_nodes.forEach( inbound => {
				const source = inbound
				const target = layer.name
        g.setEdge(source, target)
      })
    })

    return g
	}

	render() {
    this.graph = this.buildDirectedGraph({
      ...this.props.model.layers,
      ...this.props.draggedLayer
    })

    dagre.layout(this.graph)

    const layerElements = this.graph.nodes().map( name => this.graph.node(name) )
    const linkElements = this.graph.edges().map( edge => 
      ({
        source: this.graph.node(edge.v),
        target: this.graph.node(edge.w),
        properties: this.graph.edge(edge) 
      }) 
    )


    const { onLayerAdd, } = this.props

    return (
      <Graph 
        nodes={layerElements}
        edges={linkElements}
        onLayerAdd={onLayerAdd}
        onLayerHover={this.onLayerHover}
        setLayerSize={this.setLayerSize}
      />
    )
	}
}

const mapStateToProps = (state) => {
  return {
    model: state.model
  }
}

export default connect(
  mapStateToProps,
  {
    'onLayerAdd': addLayer,
    'onLayerHover': previewLayerAdd
  }

)(
  GraphContainer
)
