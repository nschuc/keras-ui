import { combineReducers } from 'redux'
import modelReducer from './model'

const reducers = combineReducers({
  model: modelReducer
})

export default reducers
