import api from '../config/axiosInstance'

export const FETCH_ALL_AGENTS = 'FETCH_ALL_AGENTS'
export const FETCH_AGENT_BY_ID = 'FETCH_AGENT_BY_ID'
export const APPROVE_AGENT = 'APPROVE_AGENT'

export const fetchAgents = () => async (dispatch) => {
  try {
    // role=4 → agent; backend expects filters as JSON string
    const filters = JSON.stringify({ roles: [{ id: 4 }] })
    const response = await api.get(`/v1/users?filters=${encodeURIComponent(filters)}`)
    dispatch({ type: FETCH_ALL_AGENTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching agents:', error)
    return null
  }
}

export const fetchAgentById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/users/${id}`)
    dispatch({ type: FETCH_AGENT_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching agent by id:', error)
    return null
  }
}

export const approveAgent = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/users/${id}/approve-agent`)
    dispatch({ type: APPROVE_AGENT, payload: response.data })
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Approval failed',
    }
  }
}

export const fetchAgentDashboard = () => async () => {
  try {
    const response = await api.get('/v1/agents/dashboard')
    return response.data
  } catch (error) {
    console.error('Error fetching agent dashboard:', error)
    return null
  }
}

export const fetchAgentMachines = () => async () => {
  try {
    const response = await api.get('/v1/agents/my-machines')
    return response.data
  } catch (error) {
    console.error('Error fetching agent machines:', error)
    return null
  }
}
