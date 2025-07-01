/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-15h-31m
 * copyright 2025
 */

import {
  ADD_PROMOTIONS,
  DELETE_PROMOTIONS,
  FETCH_ALL_PROMOTIONS,
  FETCH_PROMOTIONS_BY_ID,
  UPDATE_PROMOTIONS_BY_ID,
  // UPDATE_ITEM_TYPE_BY_ID,
} from './types'

const initialState = {
  promotions: {},
  promotionsarr: [],
  promotion: null,
}

const promotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PROMOTIONS:
      return {
        ...state,
        promotions: action.payload,
      }
    case FETCH_PROMOTIONS_BY_ID:
      return {
        ...state,
        promotion: action.payload,
      }
    // case FETCH_ITEM_BY_CLIENT:
    //   return {
    //     ...state,
    //     item: action.payload,
    //   }
    case ADD_PROMOTIONS:
      return {
        ...state,
        promotions: { ...state.promotions, ...action.payload },
      }
    //case UPDATE_ITEM_BY_ID:
    // case UPDATE_MACHINE_BY_ID:
    case UPDATE_PROMOTIONS_BY_ID:
      return {
        ...state,
        promotionsarr: state.promotionsarr.map((promotion) =>
          promotion.id === action.payload.id ? action.payload : promotion,
        ),
      }
    case DELETE_PROMOTIONS:
      return {
        ...state,
        promotionsarr: state.promotionsarr.filter((promotion) => promotion.id !== action.payload),
      }
    default:
      return state
  }
}

export default promotionReducer
