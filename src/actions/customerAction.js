/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-15h-22m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  ADD_USERS,
  DELETE_USERS,
  FETCH_ALL_USERS,
  UPDATE_USERS_BY_NUMBER,
  FETCH_USERS_BY_ID,
  UPDATE_USERS_BY_ID,
  // UPDATE_ITEM_TYPE_BY_ID,
} from './types'

export const fetchCustomers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_ALL_USERS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
//id eken fetch karanna
export const fetchCustomerById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getuser?id=${id}`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_USERS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
export const fetchCustomersByNumber = (number) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getuserbynumber?${number}`,{
  withCredentials: true,
})
    dispatch({ type: UPDATE_USERS_BY_NUMBER, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const addCustomer = (customer) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createuser`, customer,{
  withCredentials: true,
})
    dispatch({ type:  ADD_USERS, payload: response.data })
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

export const updateCustomerById = (customer) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateuser`, customer,{
  withCredentials: true,
})
    // console.log('Action response : ', response)
    dispatch({ type: UPDATE_USERS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating customer:', error)
    return null
  }
}

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteuser`, {
  withCredentials: true,

  data: { id }
});
    dispatch({ type: DELETE_USERS, payload: id })
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}
