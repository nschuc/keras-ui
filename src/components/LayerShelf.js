import React, { Component } from 'react'
import LayerContainer from './LayerContainer.js'

const layerTypes = [
  'Dense', 'Activation', 'Dropout', 'SpatialDropout2D', 'SpatialDropout3D', 'Flatten', 'Reshape',
  'Permute', 'RepeatVector', 'Merge', 'Lambda', 'ActivityRegularization', 'Masking', 'Highway',
  'MaxoutDense'
]


export default class LayerShelf extends Component {
  render() {
    const layers = layerTypes.map(
      layerType => <LayerContainer key={layerType} kerasClass={layerType} onShelf {...this.props} />
    )

    return (
      <div className="layer-shelf overflow-scroll overflow-x-hidden pa3 h-100 bg-dark-gray tc">
        {layers}
      </div>
    )
  }
}
