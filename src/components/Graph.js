import React from 'react'
import { DropTarget } from 'react-dnd'

import './Graph.css'
import GraphLayerContainer, { ItemTypes } from '../containers/GraphLayerContainer'
import Link from './Link'

const graphTarget = {
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


const Graph = props => {
  const { 
    nodes, edges, 
    onLayerAdd, onLayerHover, 
    setLayerSize,
    connectDropTarget
  } = props

    const layerElements = nodes.map( node => {
      const {  x, y, width, height, layer } = node
      return (<GraphLayerContainer
              key={layer.name} x={x} y={y}
              width={width} height={height}
              onLayerAdd={onLayerAdd}
              onLayerHover={onLayerHover}
              setLayerSize={setLayerSize}
              { ...layer } />
            )
    })

    const linkElements = edges.map( edge => {
      const { source, target, properties } = edge
      const { dx: dx1, dy:dy1 } = source
      const { dx: dx2, dy:dy2 } = target
      const { label, points } = properties
      const [ u,, v ] = points
      return (
        <Link 
          key={label} 
          x1={u.x + dx1} y1={u.y + dy1} x2={v.x + dx2 } y2={v.y + dy2} />
      )
    })

    return connectDropTarget(
      <div className="w-100 h-100">
        <div className="w-100 h-100 absolute">
          {layerElements}
        </div>
        <svg className="w-100 h-100">
          {linkElements}
        </svg>
      </div>
    )
	}

export default DropTarget(ItemTypes.LAYER, graphTarget, collect)(Graph)
