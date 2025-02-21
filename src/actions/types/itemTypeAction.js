/**
 * author Anushka Isuru Lakmal
 * created on 21-02-2025-09h-42m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../../config/config'
import {
  ADD_ITEM_TYPE,
  DELETE_ITEM_TYPE,
  FETCH_ALL_ITEM_TYPES,
  FETCH_ITEM_TYPE_BY_ID,
  UPDATE_ITEM_TYPE_BY_ID,
} from '../types'

export const fetchItemsTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/itemtypes`)
    dispatch({ type: FETCH_ALL_ITEM_TYPES, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const fetchItemTypeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getitemtype/${id}`)
    dispatch({ type: FETCH_ITEM_TYPE_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const addItemType = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createitemtype`, item)
    dispatch({ type: ADD_ITEM_TYPE, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const updateItemTypeById = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateitemtype/${id}`)
    dispatch({ type: UPDATE_ITEM_TYPE_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const deleteItemType = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteitemtype/${id}`)
    dispatch({ type: DELETE_ITEM_TYPE, payload: id })
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}
