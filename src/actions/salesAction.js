/**
 * author Anushka Isuru Lakmal
 * created on 25-02-2025-09h-18m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import { FETCH_ALL_ORDERS, FETCH_SALES_BY_ID } from './types'

export const fetchSales = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`)
    dispatch({ type: FETCH_ALL_ORDERS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const fetchSaleById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orderbyid?id=${id}`)
    dispatch({ type: FETCH_SALES_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}
