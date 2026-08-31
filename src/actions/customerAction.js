import api from '../config/axiosInstance'
import {
  ADD_USERS,
  DELETE_USERS,
  FETCH_ALL_USERS,
  UPDATE_USERS_BY_NUMBER,
  FETCH_USERS_BY_ID,
  UPDATE_USERS_BY_ID,
} from './types'

export const fetchCustomers = () => async (dispatch) => {
  try {
    // role=5 → customer; backend expects filters as JSON string
    const filters = JSON.stringify({ roles: [{ id: 5 }] })
    const response = await api.get(`/v1/users?filters=${encodeURIComponent(filters)}`)
    dispatch({ type: FETCH_ALL_USERS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching customers:', error)
    return null
  }
}

export const fetchCustomerById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/users/${id}`)
    dispatch({ type: FETCH_USERS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching customer by id:', error)
    return null
  }
}

export const fetchCustomersByNumber = (phone) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/users?phone=${encodeURIComponent(phone)}`)
    dispatch({ type: UPDATE_USERS_BY_NUMBER, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching customer by phone:', error)
    return null
  }
}

export const addCustomer = (customer) => async (dispatch) => {
  try {
    const response = await api.post('/v1/users', { ...customer, role: { id: 5 } })
    dispatch({ type: ADD_USERS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding customer:', error)
    return null
  }
}

export const updateCustomerById = (id, customer) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/users/${id}`, customer)
    dispatch({ type: UPDATE_USERS_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating customer:', error)
    return null
  }
}

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    await api.delete(`/v1/users/${id}`)
    dispatch({ type: DELETE_USERS, payload: id })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return null
  }
}
