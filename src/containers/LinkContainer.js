import React, { Component, PropTypes } from 'react'
import Link from '../components/Link'
import { DropTarget } from 'react-dnd'

const ItemTypes = {
  LAYER: 'layer'
}

const linkTarget = {

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

class LinkContainer extends Component {
  render() {
    const {
      name, 
      connectDropTarget,
      width,
      height,
      setLayerSize,
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
          ref={(ref) => setLayerSize(ref, name) }
          className="dib absolute pointer z-1" style={styles}>
          <Layer {...this.props}/>
        </div>
      )
    )
  }
}

LinkContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(ItemTypes.LAYER, linkTarget, collect)(LinkContainer);
