/**
 * author Anushka Isuru Lakmal
 * created on 25-02-2025-09h-11m
 * copyright 2025
 */

import { FETCH_ALL_ORDERS, FETCH_SALES_BY_ID } from '../actions/types'

const initialState = {
  sales: {},
  machinearr: [],
  sale: null,
}

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS:
      return {
        ...state,
        sales: action.payload,
      }
    case FETCH_SALES_BY_ID:
      return {
        ...state,
        sale: action.payload,
      }
    // case ADD_MACHINE:
    //   return {
    //     ...state,
    //     machines: { ...state.machines, ...action.payload },
    //   }
    // // case UPDATE_MACHINE_BY_ID:
    // case UPDATE_MACHINE_BY_ID:
    //   return {
    //     ...state,
    //     machinearr: state.machinearr.map((machine) =>
    //       machine.id === action.payload.id ? action.payload : machine,
    //     ),
    //   }
    // case UPDATE_MACHINE_STATUS:
    //   return {
    //     ...state,
    //     machines: state.machines.map((machine) =>
    //       machine.id === action.payload.id ? action.payload : machine,
    //     ),
    //   }
    // case DELETE_MACHINE:
    //   return {
    //     ...state,
    //     machinearr: state.machinearr.filter((machine) => machine.id !== action.payload),
    //   }
    default:
      return state
  }
}

export default salesReducer
