import api from '../config/axiosInstance'
import { FETCH_ALL_ORDERS, FETCH_SALES_BY_ID } from './types'

export const fetchSales = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/orders')
    dispatch({ type: FETCH_ALL_ORDERS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    return null
  }
}

export const fetchSaleById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/orders/${id}`)
    dispatch({ type: FETCH_SALES_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching order by id:', error)
    return null
  }
}

export const completeOrder = (id) => async () => {
  try {
    const response = await api.patch(`/v1/orders/${id}/complete`)
    return response.data
  } catch (error) {
    console.error('Error completing order:', error)
    return null
  }
}

export const refundOrder = (id) => async () => {
  try {
    const response = await api.patch(`/v1/orders/${id}/refund`)
    return response.data
  } catch (error) {
    console.error('Error refunding order:', error)
    return null
  }
}
