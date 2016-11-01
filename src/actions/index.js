export const addLayer = () => {
  return {
    type: 'ADD_LAYER',
  }
}

export const previewLayerAdd = (dragged, target) => {
  const inbound_nodes = (target && [ target.name ]) || []
  return {
    type: 'PREVIEW_LAYER',
    payload: {
      _temp: {
        ...dragged,
        inbound_nodes,
        name: '_temp'
      }
    }
  }
}
