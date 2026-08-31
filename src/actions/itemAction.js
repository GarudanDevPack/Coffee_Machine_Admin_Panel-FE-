import api from '../config/axiosInstance'
import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_ALL_ITEMS,
  FETCH_ITEM_BY_CLIENT,
  FETCH_ITEM_BY_ID,
  UPDATE_ITEM_BY_ID,
} from './types'

export const fetchItemss = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/items')
    dispatch({ type: FETCH_ALL_ITEMS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching items:', error)
    return null
  }
}

export const fetchItemById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/items/${id}`)
    dispatch({ type: FETCH_ITEM_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching item by id:', error)
    return null
  }
}

export const fetchItemsByClient = (clientId) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/items?clientId=${clientId}`)
    dispatch({ type: FETCH_ITEM_BY_CLIENT, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching items by client:', error)
    return null
  }
}

export const addItem = (item) => async (dispatch) => {
  try {
    const response = await api.post('/v1/items', item)
    dispatch({ type: ADD_ITEM, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding item:', error)
    return null
  }
}

export const updateItemById = (id, item) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/items/${id}`, item)
    dispatch({ type: UPDATE_ITEM_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating item:', error)
    return null
  }
}

export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.delete(`/v1/items/${id}`)
    dispatch({ type: DELETE_ITEM, payload: id })
  } catch (error) {
    console.error('Error deleting item:', error)
    return null
  }
}
