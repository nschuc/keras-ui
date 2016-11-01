const initialLayers = 
  {
    "input_1": {
      "name": "input_1",
      "config": {
        "name": "input_1",
        "input_dtype": "float32",
        "batch_input_shape": [
          null,
          784
        ],
        "sparse": false
      },
      "kerasClass": "InputLayer",
      "inbound_nodes": []
    },
    "dense_1": {
      "name": "dense_1",
      "config": {
        "b_regularizer": null,
        "trainable": true,
        "bias": true,
        "activation": "relu",
        "output_dim": 64,
        "init": "glorot_uniform",
        "W_constraint": null,
        "W_regularizer": null,
        "activity_regularizer": null,
        "name": "dense_1",
        "b_constraint": null,
        "input_dim": null
      },
      "kerasClass": "Dense",
      "inbound_nodes": ["input_1"]
    },
    "dense_2": {
      "name": "dense_2",
      "config": {
        "b_regularizer": null,
        "trainable": true,
        "bias": true,
        "activation": "relu",
        "output_dim": 64,
        "init": "glorot_uniform",
        "W_constraint": null,
        "W_regularizer": null,
        "activity_regularizer": null,
        "name": "dense_2",
        "b_constraint": null,
        "input_dim": null
      },
      "kerasClass": "Dense",
      "inbound_nodes": [ "dense_1" ]
    },
    "dense_3": {
      "name": "dense_3",
      "config": {
        "b_regularizer": null,
        "trainable": true,
        "bias": true,
        "activation": "softmax",
        "output_dim": 10,
        "init": "glorot_uniform",
        "W_constraint": null,
        "W_regularizer": null,
        "activity_regularizer": null,
        "name": "dense_3",
        "b_constraint": null,
        "input_dim": null
      },
      "kerasClass": "Dense",
      "inbound_nodes": [ "dense_2" ]
    }
  }

const layerTemplate =  {
    "config": {
    },
    "inbound_nodes": []
}

const initialModel = {
  configuration: {},
  name: "",
  kerasClass: 'Model',
  layers: initialLayers,
  inputs: [],
  outputs: []
}


const newLayer = (layers, {type}) => {
  let idx = 1
  let lcType = type.toLocaleLowerCase()
  while(layers[lcType + `_${idx}`]) idx++;
  const name = `${lcType}_${idx}`
  return {
    [name]: {
      ...layerTemplate,
      kerasClass: type,
      name
    }
  }
}

const layerReducer = (layers, action) => {
  switch (action.type) {
    case 'ADD_LAYER':
      return { 
        ...layers,
        ...newLayer(layers, action.payload)
      }
    default:
      return layers
  }
}

const modelReducer = (model = initialModel, action) => {
  return {
    ...model,
    layers: layerReducer(model.layers, action)
  }
}

export default modelReducer
