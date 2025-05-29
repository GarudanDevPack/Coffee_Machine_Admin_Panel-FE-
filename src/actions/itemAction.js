/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-15h-22m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_ALL_ITEMS,
  FETCH_ITEM_BY_CLIENT,
  FETCH_ITEM_BY_ID,
  UPDATE_ITEM_BY_ID,
  // UPDATE_ITEM_TYPE_BY_ID,
} from './types'

export const fetchItemss = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`)
    dispatch({ type: FETCH_ALL_ITEMS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const fetchItemById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getitem/${id}`)
    dispatch({ type: FETCH_ITEM_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
export const fetchItemsByClient = (client_id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/itemsbyclient?${client_id}`)
    dispatch({ type: FETCH_ITEM_BY_CLIENT, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const addItem = (items) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createitem`, items)
    dispatch({ type: ADD_ITEM, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

// export const updateItemById = (item) => async (dispatch) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/updateitem`, item)
//     console.log(response)
//     dispatch({ type: UPDATE_ITEM_BY_ID, payload: response.data })
//     return response.data
//   } catch (error) {
//     console.error('Error :', error)
//     return null
//   }
// }

export const updateItemById = (item) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateitem`, item)
    // console.log('Action response : ', response)
    dispatch({ type: UPDATE_ITEM_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const deleteItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteitem?id=${id}`)
    dispatch({ type: DELETE_ITEM, payload: id })
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
