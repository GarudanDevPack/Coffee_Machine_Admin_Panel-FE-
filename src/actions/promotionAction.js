
import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  ADD_PROMOTIONS,
  DELETE_PROMOTIONS,
  FETCH_ALL_PROMOTIONS,
  FETCH_PROMOTIONS_BY_ID,
  UPDATE_PROMOTIONS_BY_ID,
  // UPDATE_ITEM_TYPE_BY_ID,
} from './types'

export const fetchPromotions = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/advertisements`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_ALL_PROMOTIONS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
//id eken fetch karanna
export const fetchPromotionsById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getadvertisement?id=${id}`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_PROMOTIONS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
// export const fetchItemsByClient = (client_id) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/itemsbyclient?${client_id}`)
//     dispatch({ type: FETCH_ITEM_BY_CLIENT, payload: response.data })
//     return response.data
//   } catch (error) {
//     console.error('Error :', error)
//     return null
//   }
// }

export const addPromotions = (items) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createadvertisement`, items,{
  withCredentials: true,
})
    dispatch({ type: ADD_PROMOTIONS, payload: response.data })
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

export const updatePromotionsById = (item) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateadvertisement`, item,{
  withCredentials: true,
})
    // console.log('Action response : ', response)
    dispatch({ type: UPDATE_PROMOTIONS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const deletePromotions = (id) => async (dispatch) => {
  try {
    axios.delete(`${API_BASE_URL}/deleteadvertisement`, {
  withCredentials: true,

  data: { id }
})
    dispatch({ type: DELETE_PROMOTIONS, payload: id })
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
