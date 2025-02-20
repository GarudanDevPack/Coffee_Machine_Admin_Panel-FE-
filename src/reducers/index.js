/**
 * author Anushka Isuru Lakmal
 * created on 14-02-2025-12h-43m
 * copyright 2025
 */

import { combineReducers } from 'redux'
import machineReducer from './machineReducer'
import clientReducer from './clientReducer'
import itemReducer from './itemReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  machines: machineReducer,
  clients: clientReducer,
  items: itemReducer,
  ui: uiReducer,
})

export default rootReducer
