/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-15h-31m
 * copyright 2025
 */

import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_ALL_ITEMS,
  FETCH_ITEM_BY_CLIENT,
  FETCH_ITEM_BY_ID,
  UPDATE_ITEM_BY_ID,
} from '../actions/types'

const initialState = {
  items: {},
  itemsarr: [],
  iteme: null,
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS:
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
    case ADD_ITEM:
      return {
        ...state,
        items: {...state.items, ...action.payload},
      }
    case UPDATE_ITEM_BY_ID:
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}

export default itemReducer
