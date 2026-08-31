import api from '../config/axiosInstance'
import {
  FETCH_ALL_ALERTS,
  FETCH_ALERTS_BY_ID,
  ADD_ALERTS,
  DELETE_ALERTS,
  UPDATE_ALERTS_BY_ID,
} from './types'

export const fetchAlerts = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/alerts')
    dispatch({ type: FETCH_ALL_ALERTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return null
  }
}

export const fetchAlertById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/alerts/${id}`)
    dispatch({ type: FETCH_ALERTS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching alert by id:', error)
    return null
  }
}

export const addAlert = (alertData) => async (dispatch) => {
  try {
    const response = await api.post('/v1/alerts', alertData)
    dispatch({ type: ADD_ALERTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding alert:', error)
    return null
  }
}

export const resolveAlert = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/alerts/${id}/resolve`)
    dispatch({ type: UPDATE_ALERTS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error resolving alert:', error)
    return null
  }
}

export const updateAlertById = (id, data) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/alerts/${id}`, data)
    dispatch({ type: UPDATE_ALERTS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating alert:', error)
    return null
  }
}

export const deleteAlert = (id) => async (dispatch) => {
  try {
    await api.delete(`/v1/alerts/${id}`)
    dispatch({ type: DELETE_ALERTS, payload: id })
    return { success: true }
  } catch (error) {
    console.error('Error deleting alert:', error)
    return null
  }
}
