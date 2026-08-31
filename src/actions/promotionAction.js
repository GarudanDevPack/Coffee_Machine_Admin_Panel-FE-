import api from '../config/axiosInstance'
import {
  ADD_PROMOTIONS,
  DELETE_PROMOTIONS,
  FETCH_ALL_PROMOTIONS,
  FETCH_PROMOTIONS_BY_ID,
  UPDATE_PROMOTIONS_BY_ID,
} from './types'

export const fetchPromotions = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/promotions')
    dispatch({ type: FETCH_ALL_PROMOTIONS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return null
  }
}

export const fetchActivePromotions = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/promotions/active')
    dispatch({ type: FETCH_ALL_PROMOTIONS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching active promotions:', error)
    return null
  }
}

export const fetchPromotionsById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/promotions/${id}`)
    dispatch({ type: FETCH_PROMOTIONS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching promotion by id:', error)
    return null
  }
}

export const addPromotions = (promotion) => async (dispatch) => {
  try {
    const response = await api.post('/v1/promotions', promotion)
    dispatch({ type: ADD_PROMOTIONS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding promotion:', error)
    return null
  }
}

export const updatePromotionsById = (id, promotion) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/promotions/${id}`, promotion)
    dispatch({ type: UPDATE_PROMOTIONS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating promotion:', error)
    return null
  }
}

export const deletePromotions = (id) => async (dispatch) => {
  try {
    await api.delete(`/v1/promotions/${id}`)
    dispatch({ type: DELETE_PROMOTIONS, payload: id })
  } catch (error) {
    console.error('Error deleting promotion:', error)
    return null
  }
}
