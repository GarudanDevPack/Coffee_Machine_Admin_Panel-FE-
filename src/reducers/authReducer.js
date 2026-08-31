import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from '../actions/types'

const initialState = {
  user: null,
  token: localStorage.getItem('accessToken') || null,
  role: null,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null }

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        loading: false,
        error: null,
      }

    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false }

    case LOGOUT_USER:
      return { ...initialState, token: null }

    default:
      return state
  }
}

export default authReducer
