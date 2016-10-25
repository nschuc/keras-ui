import React, { Component } from 'react'
import Layer from './Layers.js'
import LayerContainer from './LayerContainer.js'

const layerTypes = [
  'Dense', 'Activation', 'Dropout', 'SpatialDropout2D', 'SpatialDropout3D', 'Flatten', 'Reshape',
  'Permute', 'RepeatVector', 'Merge', 'Lambda', 'ActivityRegularization', 'Masking', 'Highway',
  'MaxoutDense'
]


export default class LayerShelf extends Component {
  render() {
    const layers = layerTypes.map(
      layerType => <LayerContainer key={layerType} class_name={layerType} onShelf {...this.props} />
    )

    return (
      <div className="layer-shelf overflow-scroll pa3 h-100 bg-dark-gray tc">
        {layers}
      </div>
    )
  }
}
