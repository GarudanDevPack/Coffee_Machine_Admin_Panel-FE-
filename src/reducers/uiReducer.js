/**
 * author Anushka Isuru Lakmal
 * created on 19-02-2025-14h-17m
 * copyright 2025
 */

// reducers/uiReducer.js
const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default uiReducer
