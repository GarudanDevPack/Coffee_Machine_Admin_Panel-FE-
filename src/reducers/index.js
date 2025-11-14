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
import itemTypeReducer from './types/itemtypeReducer'
import salesReducer from './salesRudecer'
 import dashboardReducer from './dashBoardReducer'
 import authReducer from './authReducer'
import alertReducer from './alertReducer'

const rootReducer = combineReducers({
   auth: authReducer,
   alerts: alertReducer,
  machines: machineReducer,
  clients: clientReducer,
  items: itemReducer,
  sales: salesReducer,
  itemTypes: itemTypeReducer,
  ui: uiReducer,
  dashboard: dashboardReducer,
})

export default rootReducer
