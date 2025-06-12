/**
 * author Anushka Isuru Lakmal
 * created on 21-02-2025-09h-42m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../../config/config'
import {
  FETCH_ALL_ALERTS,
  FETCH_ALERTS_BY_ID,
  ADD_ALERTS,
  DELETE_ALERTS,
  UPDATE_ALERTS_BY_ID,
} from '../types'
import { useDispatch } from 'react-redux';

export const fetchAlertType = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerttypes`)
    dispatch({ type: FETCH_ALL_ALERTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const fetchAlertTypeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getalerttype?id=${id}`)
    dispatch({ type: FETCH_ALERTS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const addAlertType = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createalerttype`, item)
    dispatch({ type: ADD_ALERTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const updateAlertTypeById = (dataToUpdate) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updatealerttype`,  // Remove ID from URL
      dataToUpdate                              // Send entire data object including ID
    );
    dispatch({ type: UPDATE_ALERTS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const deleteAlertType = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deletealerttype`, { data: { id } });
    dispatch({ type: DELETE_ALERTS, payload: id })
  } catch (error) {
    console.error('Error deleting alerts:', error)
    return null
  }
}
