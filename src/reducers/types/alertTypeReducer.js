/**
 * author Anushka Isuru Lakmal
 * created on 21-02-2025-09h-57m
 * copyright 2025
 */

import {
  ADD_ITEM_TYPE,
  DELETE_ITEM_TYPE,
  FETCH_ALL_ITEM_TYPES,
  FETCH_ITEM_TYPE_BY_ID,
  UPDATE_ITEM_TYPE_BY_ID,
} from '../../actions/types'

const initialState = {
  itemtypes: {},
  itemtypearray: [],
  itemType: null,
}

const itemTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEM_TYPES:
      return {
        ...state,
        itemtypes: action.payload,
      }
    case FETCH_ITEM_TYPE_BY_ID:
      return {
        ...state,
        itemType: action.payload,
      }
    case ADD_ITEM_TYPE:
      return {
        ...state,
        itemtypes: { ...state.itemtypes, ...action.payload },
      }
    // case UPDATE_itemType_BY_ID:
    case UPDATE_ITEM_TYPE_BY_ID:
      return {
        ...state,
        itemtypearray: state.itemtypearray.map((itemType) =>
          itemType.id === action.payload.id ? action.payload : itemType,
        ),
      }
    case DELETE_ITEM_TYPE:
      return {
        ...state,
        itemtypearray: state.itemtypearray.filter((itemType) => itemType.id !== action.payload),
      }
    default:
      return state
  }
}

export default itemTypeReducer
