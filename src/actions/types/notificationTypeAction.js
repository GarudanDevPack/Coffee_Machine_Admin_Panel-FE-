/**
 * author Anushka Isuru Lakmal
 * created on 21-02-2025-09h-42m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../../config/config'
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  FETCH_ALL_NOTIFICATIONS,
  FETCH_NOTIFICATION_BY_ID,
  UPDATE_NOTIFICATION_BY_ID,
} from '../types'
import { useDispatch } from 'react-redux';

export const fetchNotificationType = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notificationtypes`)
    dispatch({ type: FETCH_ALL_NOTIFICATIONS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const fetchNotificationTypeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getnotificationtype?id=${id}`)
    dispatch({ type: FETCH_NOTIFICATION_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const addNotificationType = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createnotificationtype`, item)
    dispatch({ type: ADD_NOTIFICATION, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const updateNotificationTypeById = (dataToUpdate) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updatenotificationtype`,  // Remove ID from URL
      dataToUpdate                              // Send entire data object including ID
    );
    dispatch({ type: UPDATE_NOTIFICATION_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const deleteNotificationType = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deletenotificationtype`, { data: { id } });
    dispatch({ type: DELETE_NOTIFICATION, payload: id })
  } catch (error) {
    console.error('Error deleting machine:', error)
    return null
  }
}
