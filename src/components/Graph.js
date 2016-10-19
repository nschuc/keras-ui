import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './Graph.css'
import Layer from './Layer'
import Link from './Link'
import * as dagre from 'dagre'

export default class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = { initialized: false }
  }

	buildDirectedGraph = (layers) => {
		// Create a new directed graph 
		var g = new dagre.graphlib.Graph();

		// Set an object for the graph label
    g.setGraph({
      rankdir: 'LR',
      nodesep: 100,
      marginx: 100,
      marginy: 100
    });

		// Generate labels for edges
    g.setDefaultEdgeLabel((v, w) => 
        { 
          return {
            label: v + '__' + w 
          }
        });

		// Add all nodes first
    layers.forEach((layer) => {
      let w = 144, h = 100
      if(this.refs[layer.name]) {
        const element = ReactDom.findDOMNode(this.refs[layer.name])
        w = element.clientWidth
        h = element.clientHeight
      }
      g.setNode(layer.name, { layer: layer, width: w, height: h });
    })

    // Add all edges
    layers.forEach((layer) => {
      layer.inbound_nodes.forEach( inbound => {
				const source = inbound[0][0]
				const target = layer.name
        g.setEdge(source, target);
      })
    })

    return g;
	}

  componentDidMount() {
    this.setState({initialized: true})
  }

	buildElements = () => {
		const layers = this.props.graph.config.layers
		const linkElements = []
		const layerElements = []
    const g = this.buildDirectedGraph(layers)
    dagre.layout(g)

    g.nodes().forEach(function(v) {
      const { x, y, width, height, layer } = g.node(v)

      let component = {}
      if(layer.class_name === 'Sequential') {
        const props = {
          name: layer.name,
          class_name: layer.class_name,
          config: {
            class_name: layer.class_name,
            layers: [],
            input_layers: layer.inbound_nodes
          }
        }
        component=<Layer 
              ref={v}
              key={v} x={x} y={y}
              width={width} height={height}
              {...props} />
      }
      else {
        component=<Layer 
              ref={v}
              key={v} x={x} y={y}
              width={width} height={height}
              { ...layer } />
      }
      layerElements.push(component)
    });
    g.edges().forEach(function(e) {
      const edge = g.edge(e)
      linkElements.push(<Link key={edge.label} edge={edge} />)
    });

		this.layerElements = layerElements
    this.linkElements = linkElements
	}

	render() {
    this.buildElements()

    const styles = {
      visibility: this.state.initialized ? '' : 'hidden'
    }

    return (
      <div id="graph" style={styles}>
        <div>
          {this.layerElements}
        </div>
        <svg>
          {this.linkElements}
        </svg>
      </div>
    );
	}
}
