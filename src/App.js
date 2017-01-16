import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import GraphStore from "./stores/GraphStore.js";
import GraphContainer from "./containers/GraphContainer";
import LayerDragPreview from "./components/LayerDragPreview";

import "tachyons";
import "./App.css";

const Cursor = (props) => {
  const { x, y } = props;
  const styles = {
    position: "fixed",
    top: y,
    left: x,
    width: '25px',
    height: '25px',
    cursor: 'none',
    zIndex: 100,
    marginLeft: '-12.5px',
    marginTop: '-12.5px',
    pointerEvents: 'none'
  };

  return <div className="light-purple bg-white ba b--silver shadow-1 br-100 flex items-center justify-center" style={styles}><span className="f4 avenir">+</span></div>;
};

class App extends Component {
  state = { mouse: { x: 0, y: 0 } };

  constructor(props) {
    super(props);
    const store = GraphStore;
  }

  mouseMove({ clientX, clientY }) {
    this.setState({ mouse: { x: clientX, y: clientY } });
  }

  render() {
    return (
      <div className="App w-100 vh-100 overflow-hidden">
        <div
          onMouseMove={e => this.mouseMove(e)}
          className="w-100 bg-near-white h-100 dib v-top absolute"
          style={{ cursor: 'none' }}
        >
          <Cursor {...this.state.mouse} />
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

