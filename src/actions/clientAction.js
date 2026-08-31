import api from '../config/axiosInstance'
import {
  ADD_CLIENT,
  DELETE_MACHINE,
  FETCH_ALL_CLIENTS,
  FETCH_CLIENT_BY_ID,
  UPDATE_CLIENT_BY_ID,
} from './types'

// Organizations (replaces old /clientlogs)
export const fetchClients = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/organizations')
    dispatch({ type: FETCH_ALL_CLIENTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return null
  }
}

export const fetchLoggedClient = () => async (dispatch) => {
  try {
    const { data } = await api.get('/v1/organizations/mine')
    dispatch({ type: FETCH_CLIENT_BY_ID, payload: data })
    return data
  } catch (err) {
    console.error('Error fetching logged client org:', err)
    return { success: false, message: 'Unable to fetch organization' }
  }
}

export const fetchClientById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/organizations/${id}`)
    dispatch({ type: FETCH_CLIENT_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching org by id:', error)
    return null
  }
}

export const fetchCurrentClient = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/organizations/mine')
    dispatch({ type: FETCH_CLIENT_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching current org:', error)
    return null
  }
}

export const addClient = (client) => async (dispatch) => {
  try {
    const response = await api.post('/v1/organizations', client)
    dispatch({ type: ADD_CLIENT, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error creating organization:', error)
    return null
  }
}

export const updateClientById = (id, data) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/organizations/${id}`, data)
    dispatch({ type: UPDATE_CLIENT_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating organization:', error)
    return null
  }
}

export const deleteClient = (id) => async (dispatch) => {
  try {
    await api.delete(`/v1/organizations/${id}`)
    dispatch({ type: DELETE_MACHINE, payload: id })
  } catch (error) {
    console.error('Error deleting organization:', error)
    return null
  }
}

export const assignMachineToOrg = (orgId, machineId) => async () => {
  try {
    const response = await api.post(`/v1/organizations/${orgId}/machines`, { machineId })
    return response.data
  } catch (error) {
    console.error('Error assigning machine to org:', error)
    return null
  }
}

export const assignAgentToOrg = (orgId, agentId) => async () => {
  try {
    const response = await api.post(`/v1/organizations/${orgId}/agents`, { agentId })
    return response.data
  } catch (error) {
    console.error('Error assigning agent to org:', error)
    return null
  }
}
