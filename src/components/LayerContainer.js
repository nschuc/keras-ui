import React, { Component, PropTypes } from 'react'
import Layer from './Layers'
import { DragSource } from 'react-dnd'

const ItemTypes = {
  LAYER: 'layer'
}

const layerSource = {
  beginDrag({kerasClass}) {
    return {
      kerasClass
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class LayerContainer extends Component {
  render() {
    const {
      name, 
      connectDragSource,
      isDragging,
      onShelf,
      width,
      height,
      setLayerSize
    } = this.props

    const styles = {
      top: this.props.y,
      left: this.props.x,
      marginLeft: -width / 2,
      marginTop: -height / 2,
      cursor: 'pointer',
      opacity: isDragging ? 0.5 : 1
    }


    const shelfOrLayerClass = onShelf ? 'mt2 w-100' : 'absolute'

    return (
      connectDragSource(
        <div 
          ref={(ref) => !onShelf ? setLayerSize(ref, name) : 0 }
          className={`dib pointer z-1 ${shelfOrLayerClass}`} style={styles}>
          <Layer {...this.props}/>
        </div>
      )
    )
  }
}

LayerContainer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.LAYER, layerSource, collect)(LayerContainer);
export { ItemTypes }
