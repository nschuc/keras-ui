import React, { Component, PropTypes } from 'react'
import Layer from '../components/Layers'
import { DropTarget } from 'react-dnd'

const ItemTypes = {
  LAYER: 'layer',
  LINK: 'link'
}

const layerTarget = {

  hover(props, monitor, component) {
    props.onLayerHover(monitor.getItem(), props)
  },

  drop(props, monitor, component) {
    props.onLayerAdd(monitor.getItem(), props)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class GraphLayerContainer extends Component {
  render() {
    const {
      name, 
      connectDropTarget,
      width,
      height,
    } = this.props

    const styles = {
      top: this.props.y,
      left: this.props.x,
      cursor: 'pointer',
      opacity: name === '_temp' ? 0.5 : 1,
      marginLeft: -width / 2,
      marginTop: -height / 2,
    }

    return (
      connectDropTarget(
        <div 
          className="dib absolute pointer z-1 w3 h3" style={styles}>
          <Layer {...this.props}/>
        </div>
      )
    )
  }
}

GraphLayerContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(ItemTypes.LAYER, layerTarget, collect)(GraphLayerContainer);
export { ItemTypes }
