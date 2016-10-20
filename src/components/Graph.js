import React, { Component } from 'react'
import * as dagre from 'dagre'

import './Graph.css'
import Layer from './Layer'
import Link from './Link'


export default class Graph extends Component {

  constructor(props) {
    super(props)
    this.graph = this.buildDirectedGraph(this.props.graph.config.layers)
    this.state = { 
      initialized: false
    }
  }

  // Keep track of layer sizes so we can properly layout dag
  setLayerSize = (ref, name) => {
    if(ref) {
      this.graph.node(name).width = ref.clientWidth
      this.graph.node(name).height = ref.clientHeight
    }
  }

  // Track layer dragging to re-render lines in correct places
  onDrag = (name, data) => {
    this.graph.node(name).dx = data.x
    this.graph.node(name).dy = data.y
    this.forceUpdate()
  }


	buildDirectedGraph = (layers) => {
		// Create a new directed graph 
		var g = new dagre.graphlib.Graph()

		// Set an object for the graph label
    g.setGraph({
      rankdir: 'LR',
      nodesep: 100,
      marginx: 250,
      marginy: 250
    })

		// Generate labels for edges
    g.setDefaultEdgeLabel((v, w) => 
        { 
          return {
            label: v + '__' + w 
          }
        })

		// Add all nodes first
    layers.forEach((layer) => {
      let width = 100, height= 100
      g.setNode(layer.name, { 
        layer, 
        width, 
        height,
        dx: 0,
        dy: 0
      })
    })

    // Add all edges
    layers.forEach((layer) => {
      layer.inbound_nodes.forEach( inbound => {
				const source = inbound[0][0]
				const target = layer.name
        g.setEdge(source, target)
      })
    })

    return g
	}

  componentDidMount() {
    dagre.layout(this.graph)
    this.setState({initialized: true})
  }

	render() {
    const layerElements = this.graph.nodes().map((v) => {
      const { x, y, width, height, layer } = this.graph.node(v)

      return (<Layer 
              key={v} x={x} y={y}
              width={width} height={height}
              onDrag={this.onDrag}
              setLayerSize={this.setLayerSize}
              { ...layer } />
            )
    })

    let linkElements = []

    if(this.state.initialized) {
      linkElements = this.graph.edges().map((e) => {
        const { dx: dx1, dy:dy1 } = this.graph.node(e.v)
        const { dx: dx2, dy:dy2 } = this.graph.node(e.w)
        const { label, points } = this.graph.edge(e)
        const [ u,, v ] = points
        return (
          <Link 
            key={label} 
            x1={u.x + dx1} y1={u.y + dy1} x2={v.x + dx2 } y2={v.y + dy2} />
        )
      })
    }

    const styles = {
      visibility: this.state.initialized ? '' : 'hidden'
    }

    return (
      <div id="graph" style={styles}>
        <div>
          {layerElements}
        </div>
        <svg className="bg-near-white">
          {linkElements}
        </svg>
      </div>
    )
	}
}
