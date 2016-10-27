const initialLayers = 
  [
    {
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
    {
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
      "inbound_nodes": [
        [
          [
            "input_1",
            0,
            0
          ]
        ]
      ]
    },
    {
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
      "inbound_nodes": [
        [
          [
            "dense_1",
            0,
            0
          ]
        ]
      ]
    },
    {
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
      "inbound_nodes": [
        [
          [
            "dense_2",
            0,
            0
          ]
        ]
      ]
    }
  ]

const layerTemplate =  {
  "name": "dense_4",
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
    "name": "dense_4",
    "b_constraint": null,
    "input_dim": null
  },
  "kerasClass": "Dense",
  "inbound_nodes": [
    [
      [
        "dense_3",
        0,
        0
      ]
    ]
  ]
}

const initialModel = {
  configuration: {},
  name: "",
  kerasClass: 'Model',
  layers: initialLayers,
  inputs: [],
  outputs: []
}

const layerReducer = (layers, action) => {
  switch (action.type) {
    case 'ADD_LAYER':
      const newLayer = {
        ...layerTemplate,
        kerasClass: action.kerasClass
      }
      const newLayers = layers.concat(newLayer)
      return newLayers
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
