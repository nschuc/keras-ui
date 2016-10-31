import React, { Component } from 'react'
import * as dagre from 'dagre'
import { DropTarget } from 'react-dnd'

import './Graph.css'
import GraphLayerContainer, { ItemTypes } from '../containers/GraphLayerContainer'
import Link from './Link'

 
const graphTarget = {
  drop(props, monitor, component) {
    const { kerasClass } = monitor.getItem()
    props.onAddLayer(kerasClass)
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Graph extends Component {

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

  // Track layer dragging to re-render lines in correct places
  onLayerHover = (dragged, target) => {
    this.setState({
      dragged: {
        fucc: {
          ...dragged,
          inbound_nodes: [
            target.name
          ],
          name: 'fucc'
        }
      }
    })
  }


	buildDirectedGraph = (layers) => {
		// Create a new directed graph 
		var g = this.graph || new dagre.graphlib.Graph()

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
    Object.keys(layers).forEach((name) => {
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
    Object.keys(layers).forEach((name) => {
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

  componentDidMount() {
    this.setState({initialized: true})
  }

	render() {
    this.graph = this.buildDirectedGraph({
      ...this.props.model.layers,
      ...this.state.dragged
    })

    dagre.layout(this.graph)

    const layerElements = this.graph.nodes().map((v) => {
      const { x, y, width, height, layer } = this.graph.node(v)
      return (<GraphLayerContainer
              key={v} x={x} y={y}
              width={width} height={height}
              onLayerAdd={this.props.onAddLayer}
              onLayerHover={this.onLayerHover}
              setLayerSize={this.setLayerSize}
              { ...layer } />
            )
    })

    const linkElements = this.graph.edges().map((e) => {
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

    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div className="w-100 h-100">
        <div className="w-100 h-100 absolute">
          {layerElements}
        </div>
        <svg className="w-100 h-100">
          {linkElements}
        </svg>
      </div>
    )
	}
}

export default DropTarget(ItemTypes.LAYER, graphTarget, collect)(Graph);
