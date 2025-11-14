/**
 * author Anushka Isuru Lakmal
 * created on 11-11-2025-10h-30m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  FETCH_ALL_ALERTS,
  FETCH_ALERTS_BY_ID,
  ADD_ALERTS,
  DELETE_ALERTS,
  UPDATE_ALERTS_BY_ID,
} from './types'

// Fetch all alerts
export const fetchAlerts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`, {
      withCredentials: true,
    })
    dispatch({ type: FETCH_ALL_ALERTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return null
  }
}

// Fetch alert by ID
export const fetchAlertById = (id) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/getalert`,
      { id },
      { withCredentials: true }
    )
    dispatch({ type: FETCH_ALERTS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching alert by ID:', error)
    return null
  }
}

// Add new alert
export const addAlert = (alertData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createalert`, alertData, {
      withCredentials: true,
    })
    dispatch({ type: ADD_ALERTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding alert:', error)
    return null
  }
}

// Update alert by ID
export const updateAlertById = (data) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updatealert`, data, {
      withCredentials: true,
    })
    dispatch({ type: UPDATE_ALERTS_BY_ID, payload: response.data.data })
    return response.data
  } catch (error) {
    console.error('Error updating alert:', error)
    return null
  }
}

// Delete alert
export const deleteAlert = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deletealert`, {
      withCredentials: true,
      data: { id },
    })
    dispatch({ type: DELETE_ALERTS, payload: id })
    return { success: true }
  } catch (error) {
    console.error('Error deleting alert:', error)
    return null
  }
}