import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from './types'

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      withCredentials: true, // Send HTTP-only cookie
    })

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.data, // contains id, name, role
    })
    return response.data
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed',
    })
    return null
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    dispatch({ type: LOGOUT_USER })
  }
}
