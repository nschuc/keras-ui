import React, { Component } from 'react'
import Layer from './Layer'
import Link from './Link'
import * as dagre from 'dagre'

export default class Graph extends Component {

	buildDirectedGraph = (layers) => {
		// Create a new directed graph 
		var g = new dagre.graphlib.Graph();

		// Set an object for the graph label
		g.setGraph({});

		// Generate labels for edges
    g.setDefaultEdgeLabel((v, w) => 
        { 
          return {
            label: v + '__' + w 
          }
        });

		// Add all nodes first
    layers.forEach((layer) => {
      g.setNode(layer.name, { layer: layer, width: 144, height: 100 });
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

	buildElements = () => {
		const layers = this.props.graph.config.layers
		const linkElements = []
		const layerElements = []
    const g = this.buildDirectedGraph(layers)
    dagre.layout(g)

    g.nodes().forEach(function(v) {
      const { x, y, layer } = g.node(v)
        layerElements.push(
            <Layer 
              key={v} 
              x={x}
              y={y}
              { ...layer } />
            )
    });
    g.edges().forEach(function(e) {
      //console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
      //linkElements.push(<Link key= source={this.state[source]} target={this.state[target]} />)
    });

		this.layerElements = layerElements;
	}

	render() {
			this.buildElements()

			return (
				<div id="graph">
					{this.layerElements}
				</div>
			);
	}
}
