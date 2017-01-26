import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import GraphStore from "./stores/GraphStore.js";
import GraphContainer from "./containers/GraphContainer";
import LayerDragPreview from "./components/LayerDragPreview";
import AddLayerModal from "./components/AddLayerDialog";

import "tachyons";
import "./App.css";

const Cursor = props => {
  const { x, y } = props;
  const styles = {
    position: "fixed",
    top: y,
    left: x,
    width: "25px",
    height: "25px",
    cursor: "none",
    zIndex: 100,
    transform: 'translate(-50%, -50%)',
    pointerEvents: "none"
  };

  return (
    <div
      className="light-purple bg-white ba b--silver shadow-1 br-100 flex items-center justify-center"
      style={styles}
    >
      <span className="f4 avenir">+</span>
    </div>
  );
};

const l2Distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
const maxDistance = 150;
// How far before add layer modal disappears
class App extends Component {
  state = { mouse: { x: 0, y: 0 }, mousePress: null, distance: 0 };

  constructor(props) {
    super(props);
    const store = GraphStore;
  }

  mouseMove({ clientX, clientY }) {
    let distance = 0;
    let mousePress = this.state.mousePress;
    if (this.state.mousePress) {
      const { x, y } = this.state.mousePress;
      distance = l2Distance(x, y, clientX, clientY);
      if (distance > maxDistance) {
        mousePress = null;
      }
    }
    this.setState({ 
      mouse: { x: clientX, y: clientY },
      mousePress,
      distance
    });
  }

  mouseDown({ clientX, clientY }) {
    this.setState({ mousePress: { x: clientX, y: clientY } });
  }

  render() {
    let addLayer = null;
    if (this.state.mousePress) {
      const opacity = 1 - this.state.distance / maxDistance
      addLayer = (
        <AddLayerModal
          {...this.state.mousePress}
          opacity={opacity}
        />
      );
    } else {
      addLayer = <Cursor {...this.state.mouse} />;
    }

    return (
      <div className="App w-100 vh-100 overflow-hidden">
        <div
          onMouseMove={e => this.mouseMove(e)}
          onMouseDown={e => this.mouseDown(e)}
          className="w-100 bg-near-white h-100 dib v-top absolute"
          style={{ cursor: this.state.mousePress ? "auto" : "none" }}
        >
          {addLayer}
          <GraphContainer model={GraphStore} />
          <div
            style={{ pointerEvents: "none" }}
            className="Logo-Container w-100 v-mid tc"
          >
            <h1 className="App-logo bg-purple f-headline lh-solid">KerasUI</h1>
          </div>
        </div>
        <LayerDragPreview />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)

