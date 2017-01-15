import React from 'react'
import './Layer.css'

const LayerProperty = ({name, value}) =>
  <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
    <dd className="f6 fw7 ml0">{name}</dd>
    <dd className="f6 fw3 ml0">{value}</dd>
  </dl>

const PropertyList = ({config}) => {
  const layerProperties = Object.keys(config).map((key) => {
    if(config[key]) {
      return (
        <LayerProperty key={key} name={key} value={config[key]} />
      )
    }
    return undefined
  })
  return (
    <div>
    { layerProperties }
    </div>
  )
}

const DefaultLayer = ({config, kerasClass}) => {
  config = config || {}
  return (
    <div className="keras-layer bg-white br3 ba b--silver h-100 w-100 dib flex items-center justify-center">
      <span className="f4 avenir">{kerasClass.slice(0, 1)}</span>
    </div>
  )
}

const Layer = props => {
  const LayerComponent = DefaultLayer
  return (<LayerComponent {...props} />)
}

export default Layer
