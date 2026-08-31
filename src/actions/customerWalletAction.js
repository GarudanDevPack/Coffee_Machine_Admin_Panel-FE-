import api from '../config/axiosInstance'
import { FETCH_ALL_WALLETS } from './types'

export const fetchWallets = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/wallet/all')
    dispatch({ type: FETCH_ALL_WALLETS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching wallets:', error)
    return null
  }
}

export const fetchMyWallet = () => async () => {
  try {
    const response = await api.get('/v1/wallet/me/balance')
    return response.data
  } catch (error) {
    console.error('Error fetching my wallet:', error)
    return null
  }
}

export const topupWallet = (userId, amount, note) => async () => {
  try {
    const response = await api.post('/v1/wallet/topup', { userId, amount, note })
    return response.data
  } catch (error) {
    console.error('Error topping up wallet:', error)
    return null
  }
}

export const agentTopupWallet = (targetUserId, amount, note) => async () => {
  try {
    const response = await api.post('/v1/wallet/agent-topup', { targetUserId, amount, note })
    return response.data
  } catch (error) {
    console.error('Error agent topup:', error)
    return null
  }
}

export const submitTopupRequest = (amount, paymentSlipUrl, note) => async () => {
  try {
    const response = await api.post('/v1/wallet/topup-request', { amount, paymentSlipUrl, note })
    return response.data
  } catch (error) {
    console.error('Error submitting topup request:', error)
    return null
  }
}

export const fetchTopupRequests = (status) => async () => {
  try {
    const params = status ? `?status=${status}` : ''
    const response = await api.get(`/v1/wallet/topup-requests${params}`)
    return response.data
  } catch (error) {
    console.error('Error fetching topup requests:', error)
    return null
  }
}

export const approveTopupRequest = (id, reviewNote) => async () => {
  try {
    const response = await api.patch(`/v1/wallet/topup-requests/${id}/approve`, { reviewNote })
    return response.data
  } catch (error) {
    console.error('Error approving topup request:', error)
    return null
  }
}

export const rejectTopupRequest = (id, reviewNote) => async () => {
  try {
    const response = await api.patch(`/v1/wallet/topup-requests/${id}/reject`, { reviewNote })
    return response.data
  } catch (error) {
    console.error('Error rejecting topup request:', error)
    return null
  }
}
