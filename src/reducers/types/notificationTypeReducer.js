/**
 * author Anushka Isuru Lakmal
 * created on 21-02-2025-09h-57m
 * copyright 2025
 */

import {
   ADD_NOTIFICATION,
   DELETE_NOTIFICATION,
   FETCH_ALL_NOTIFICATIONS,
   FETCH_NOTIFICATION_BY_ID,
   UPDATE_NOTIFICATION_BY_ID,
} from '../../actions/types'

const initialState = {
  notificationtypes: {},
  notificationtypearray: [],
  notificationType: null,
}

const notificationTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_NOTIFICATIONS:
      return {
        ...state,
        notificationtypes: action.payload,
      }
    case FETCH_NOTIFICATION_BY_ID:
      return {
        ...state,
        notificationtypes: action.payload,
      }
    case ADD_NOTIFICATION:
      return {
        ...state,
        notificationtypes: { ...state.notificationtypes, ...action.payload },
      }
    // case UPDATE_notificationType_BY_ID:
    case UPDATE_NOTIFICATION_BY_ID:
      return {
        ...state,
        notificationtypearray: state.notificationtypearray.map((notificationtypes) =>
          notificationtypes.id === action.payload.id ? action.payload : notificationtypes,
        ),
      }
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notificationtypearray: state.notificationtypearray.filter((notificationtypes) => notificationtypes.id !== action.payload),
      }
    default:
      return state
  }
}

export default  notificationTypeReducer 

