import React, { Component, PropTypes } from 'react'
import Layer from '../components/Layers'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

const ItemTypes = {
  LAYER: 'layer'
}

const layerSource = {
  beginDrag({kerasClass, config, name}) {
    return {
      kerasClass,
      config: {},
      name,
      inbound_nodes: []
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class ShelfLayerContainer extends Component {

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

  render() {
    const {
      connectDragSource,
      isDragging,
    } = this.props

    const styles = {
      top: this.props.y,
      left: this.props.x,
      cursor: 'pointer',
      opacity: isDragging ? 0.5 : 1,
    }

    return (
      connectDragSource(
        <div 
          className={`dib pointer z-1 mt2 w-100`} style={styles}>
          <Layer {...this.props}/>
        </div>
      )
    )
  }
}

ShelfLayerContainer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.LAYER, layerSource, collect)(ShelfLayerContainer);
export { ItemTypes }
