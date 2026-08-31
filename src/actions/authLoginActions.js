import api from '../config/axiosInstance'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from './types'

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await api.post('/login', credentials)
    const { data } = response.data

    if (data?.token) localStorage.setItem('accessToken', data.token)
    if (data?.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data, token: data?.token, role: data?.role },
    })
    return { success: true, data: response.data }
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
    await api.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    dispatch({ type: LOGOUT_USER })
  }
}

// OTP Phone Login — Step 1: send OTP
export const sendPhoneOtp = (phone) => async () => {
  try {
    const response = await api.post('/auth/phone/send-otp', { phone })
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send OTP',
    }
  }
}

// OTP Phone Login — Step 2: verify OTP and log in
export const verifyPhoneOtp = (phone, code) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await api.post('/auth/phone/verify-otp', { phone, code })
    const { token, refreshToken, user } = response.data

    if (token) localStorage.setItem('accessToken', token)
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token, role: user?.role },
    })
    return { success: true, data: response.data }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Invalid or expired OTP',
    })
    return {
      success: false,
      message: error.response?.data?.message || 'Invalid or expired OTP',
    }
  }
}

// Register new user (customer self-register)
export const registerUser = (data) => async () => {
  try {
    const response = await api.post('/auth/email/register', data)
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed',
    }
  }
}
