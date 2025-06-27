/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-15h-31m
 * copyright 2025
 */

import {
   ADD_USERS,
  DELETE_USERS,
  FETCH_ALL_USERS,
  UPDATE_USERS_BY_NUMBER,
  FETCH_USERS_BY_ID,
  UPDATE_USERS_BY_ID,
} from '../actions/types'

const initialState = {
  customers: {},
  customersarr: [],
  customer: null,
}

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        customers: action.payload,
      }
    case FETCH_USERS_BY_ID:
      return {
        ...state,
        customer: action.payload,
      }
    case UPDATE_USERS_BY_NUMBER:
      return {
        ...state,
        customer: action.payload,
      }
    case ADD_USERS:
      return {
        ...state,
        customers: { ...state.customers, ...action.payload },
      }
    //case UPDATE_ITEM_BY_ID:
    // case UPDATE_MACHINE_BY_ID:
    case UPDATE_USERS_BY_ID:
      return {
        ...state,
        customersarr: state.customersarr.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer,
        ),
      }
    case  DELETE_USERS:
      return {
        ...state,
        customersarr: state.customersarr.filter((customer) => customer.id !== action.payload),
      }
    default:
      return state
  }
}

export default customerReducer
