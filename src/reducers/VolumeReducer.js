/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-15h-31m
 * copyright 2025
 */

import {
   ADD_VOLUMES,
  DELETE_VOLUMES,
  FETCH_ALL_VOLUMES,
  FETCH_VOLUMES_BY_CLIENT,
  FETCH_VOLUMES_BY_ID,
  UPDATE_VOLUMES_BY_ID,
} from '../actions/types'

const initialState = {
  volumes: {},
  volumesarr: [],
  volumes: null,
}

const volumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_VOLUMES:
      return {
        ...state,
        items: action.payload,
      }
    case FETCH_ITEM_BY_ID:
      return {
        ...state,
        item: action.payload,
      }
    case FETCH_ITEM_BY_CLIENT:
      return {
        ...state,
        item: action.payload,
      }
    case ADD_VOLUMES:
      return {
        ...state,
        items: { ...state.items, ...action.payload },
      }
    //case UPDATE_ITEM_BY_ID:
    // case UPDATE_MACHINE_BY_ID:
    case UPDATE_VOLUMES_BY_ID:
      return {
        ...state,
        itemsarr: state.itemsarr.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      }
    case DELETE_ITEM:
      return {
        ...state,
        itemsarr: state.itemsarr.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}

export default volumeReducer
