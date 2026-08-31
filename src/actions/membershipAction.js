import api from '../config/axiosInstance'

export const FETCH_ALL_MEMBERSHIPS = 'FETCH_ALL_MEMBERSHIPS'
export const FETCH_MY_MEMBERSHIP = 'FETCH_MY_MEMBERSHIP'
export const SUBSCRIBE_MEMBERSHIP = 'SUBSCRIBE_MEMBERSHIP'
export const CANCEL_MEMBERSHIP = 'CANCEL_MEMBERSHIP'

export const fetchAllMemberships = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/memberships')
    dispatch({ type: FETCH_ALL_MEMBERSHIPS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching memberships:', error)
    return null
  }
}

export const fetchMyMembership = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/memberships/my')
    dispatch({ type: FETCH_MY_MEMBERSHIP, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching my membership:', error)
    return null
  }
}

// plan: '1month' | '3month' | '5month'
// targetUserId: optional — when agent subscribes on behalf of customer
export const subscribeMembership = (plan, targetUserId) => async (dispatch) => {
  try {
    const body = { plan }
    if (targetUserId) body.targetUserId = targetUserId
    const response = await api.post('/v1/memberships/subscribe', body)
    dispatch({ type: SUBSCRIBE_MEMBERSHIP, payload: response.data })
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Subscription failed',
    }
  }
}

export const cancelMembership = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/memberships/${id}/cancel`)
    dispatch({ type: CANCEL_MEMBERSHIP, payload: id })
    return response.data
  } catch (error) {
    console.error('Error cancelling membership:', error)
    return null
  }
}
