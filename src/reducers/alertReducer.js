/**
 * author Anushka Isuru Lakmal
 * created on 11-11-2025-10h-35m
 * copyright 2025
 */

import {
  FETCH_ALL_ALERTS,
  FETCH_ALERTS_BY_ID,
  ADD_ALERTS,
  DELETE_ALERTS,
  UPDATE_ALERTS_BY_ID,
} from '../actions/types'

const initialState = {
  alerts: [],
  alert: null,
  loading: false,
  error: null,
}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ALERTS:
      return {
        ...state,
        alerts: action.payload?.data || [],
        loading: false,
      }
    case FETCH_ALERTS_BY_ID:
      return {
        ...state,
        alert: action.payload?.data || null,
        loading: false,
      }
    case ADD_ALERTS:
      return {
        ...state,
        alerts: Array.isArray(state.alerts)
          ? [...state.alerts, action.payload.data]
          : [action.payload.data],
      }
    case UPDATE_ALERTS_BY_ID:
      return {
        ...state,
        alerts: Array.isArray(state.alerts)
          ? state.alerts.map((alert) =>
              alert.id === action.payload.id ? action.payload : alert
            )
          : [action.payload],
      }
    case DELETE_ALERTS:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      }
    default:
      return state
  }
}

export default alertReducer