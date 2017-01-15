import React, { Component } from "react";
import { observer } from "mobx-react";
import * as dagre from "dagre";
import Graph from "../components/Graph";

class GraphContainer extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  buildDirectedGraph = layers => {
    // Create a new directed graph
    var g = new dagre.graphlib.Graph();

    // Set an object for the graph label
    g.setGraph({ rankdir: "LR", nodesep: 100, marginx: 100, marginy: 100 });

    // Generate labels for edges
    g.setDefaultEdgeLabel((v, w) => {
      return { label: v + "__" + w };
    });

    // Add all nodes first
    Object.keys(layers).forEach(name => {
      const layer = layers[name];
      if (!layer)
        return;

      g.setNode(layer.name, { layer, width: 64, height: 64, dx: 0, dy: 0 });
    });

    // Add all edges
    Object.keys(layers).forEach(name => {
      const layer = layers[name];
      if (!layer)
        return;
      layer.inbound_nodes.forEach(inbound => {
        const source = inbound;
        const target = layer.name;
        g.setEdge(source, target);
      });
    });

    return g;
  };

  addLayer(layer) {
    console.log(layer);
    this.props.model.addLayer(layer);
  }

  previewLayer(layer) {}

  render() {
    this.graph = this.buildDirectedGraph({
      ...this.props.model.layers,
      ...this.props.draggedLayer
    });

    dagre.layout(this.graph);

    const layerElements = this.graph.nodes().map(name => this.graph.node(name));
    const linkElements = this.graph
      .edges()
      .map(
        edge =>
          ({
            source: this.graph.node(edge.v),
            target: this.graph.node(edge.w),
            properties: this.graph.edge(edge)
          })
      );

    console.log(layerElements)

    return (
      <Graph
        nodes={layerElements}
        edges={linkElements}
        onLayerHover={this.previewLayer}
        onLayerAdd={layer => this.addLayer(layer)}
      />
    );
  }
}

export default observer(GraphContainer)

