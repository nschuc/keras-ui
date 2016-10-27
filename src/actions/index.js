export const addLayer = (type) => {
  return {
    type: 'ADD_LAYER',
    payload: {
      type,
    }
  }
}
