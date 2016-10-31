import React, { Component } from 'react'
import ShelfLayerContainer from '../containers/ShelfLayerContainer.js'

const layerTypes = [
  'Dense', 'Activation', 'Dropout', 'SpatialDropout2D', 'SpatialDropout3D', 'Flatten', 'Reshape',
  'Permute', 'RepeatVector', 'Merge', 'Lambda', 'ActivityRegularization', 'Masking', 'Highway',
  'MaxoutDense'
]


export default class LayerShelf extends Component {
  render() {
    const layers = layerTypes.map(
      layerType => <ShelfLayerContainer key={layerType} kerasClass={layerType} {...this.props} />
    )

    return (
      <div className="layer-shelf overflow-scroll overflow-x-hidden pa3 h-100 bg-dark-gray tc">
        {layers}
      </div>
    )
  }
}
