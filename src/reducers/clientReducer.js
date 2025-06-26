/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-14h-48m
 * copyright 2025
 */

import {
  ADD_CLIENT,
  DELETE_CLIENT,
  FETCH_ALL_CLIENTS,
  FETCH_CLIENT_BY_ID,
  UPDATE_CLIENT_BY_ID,
} from '../actions/types'

const initialState = {
  
  
   clients: [],
  clientsarr: [],
  client: null,
  
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      }
    case FETCH_CLIENT_BY_ID:
      return {
        ...state,
        client: action.payload,
      }
    case ADD_CLIENT:
      return {
        ...state,
         clients: Array.isArray(state.clients) 
          ? [...state.clients, action.payload]
          : [action.payload],
      }
   case UPDATE_CLIENT_BY_ID:
  return {
    ...state,
    clients: Array.isArray(state.clients)
      ? state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client
        )
      : [action.payload], // fallback: replace the whole thing
  }
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.payload),
      }
    default:
      return state
  }
}

export default clientReducer
