
import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
 FETCH_ALL_WALLETS
  // UPDATE_ITEM_TYPE_BY_ID,
} from './types'

export const fetchWallets = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallets`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_ALL_WALLETS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}