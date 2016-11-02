import React from 'react';
import { DropTarget } from 'react-dnd'

const ItemTypes = {
  LAYER: 'layer'
}

const linkTarget = {
  hover(props, monitor, component) {
    console.log("link hover")
  },
  drop(props, monitor, component) {
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    if(isJustOverThisOne) {
      props.onLayerAdd(monitor.getItem(), props)
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const Link = props => {
  const { connectDropTarget, isOver, ...rest } = props
  return connectDropTarget(<line { ...rest }
    strokeWidth="2" stroke="black"
  />)
}

export default DropTarget(ItemTypes.LAYER, linkTarget, collect)(Link)
