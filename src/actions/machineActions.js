import api from '../config/axiosInstance'
import {
  ADD_MACHINE,
  DELETE_MACHINE,
  FETCH_ALL_MACHINES,
  FETCH_ALL_MACHINES_BY_CLIENT,
  FETCH_ALL_MACHINES_STOCKS,
  FETCH_ALL_MACHINES_STOCKS_BY_CLIENT,
  FETCH_MACHINE_BY_ID,
  UPDATE_MACHINE_BY_ID,
  UPDATE_MACHINE_STATUS,
} from './types'

export const fetchMachines = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/machines')
    dispatch({ type: FETCH_ALL_MACHINES, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching machines:', error)
    return null
  }
}

export const fetchMachinesById = (clientId, orgId) => async (dispatch) => {
  try {
    const params = new URLSearchParams()
    if (clientId) params.append('clientId', clientId)
    if (orgId) params.append('orgId', orgId)
    const response = await api.get(`/v1/machines?${params.toString()}`)
    dispatch({ type: FETCH_ALL_MACHINES_BY_CLIENT, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching machines by client:', error)
    return null
  }
}

export const fetchMachineStocks = () => async (dispatch) => {
  try {
    const response = await api.get('/v1/machines')
    dispatch({ type: FETCH_ALL_MACHINES_STOCKS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching machine stocks:', error)
    return null
  }
}

export const fetchMachineStocksByClient = (clientId, orgId) => async (dispatch) => {
  try {
    const params = new URLSearchParams()
    if (clientId) params.append('clientId', clientId)
    if (orgId) params.append('orgId', orgId)
    const response = await api.get(`/v1/machines?${params.toString()}`)
    dispatch({ type: FETCH_ALL_MACHINES_STOCKS_BY_CLIENT, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching machine stocks by client:', error)
    return null
  }
}

export const fetchMachineById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/v1/machines/${id}`)
    dispatch({ type: FETCH_MACHINE_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error fetching machine by id:', error)
    return null
  }
}

export const addMachine = (machine) => async (dispatch) => {
  try {
    const response = await api.post('/v1/machines', machine)
    dispatch({ type: ADD_MACHINE, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const updateMachineById = (id, machine) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/machines/${id}`, machine)
    dispatch({ type: UPDATE_MACHINE_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating machine:', error)
    return null
  }
}

export const updateMachinestatus = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/v1/machines/${id}`, { isOnline: true })
    dispatch({ type: UPDATE_MACHINE_STATUS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error updating machine status:', error)
    return null
  }
}

export const deleteMachine = (id) => async (dispatch) => {
  try {
    await api.delete(`/v1/machines/${id}`)
    dispatch({ type: DELETE_MACHINE, payload: id })
  } catch (error) {
    console.error('Error deleting machine:', error)
    return null
  }
}

export const sleepMachine = (machineId) => async () => {
  try {
    const response = await api.post(`/v1/machines/${machineId}/sleep`)
    return response.data
  } catch (error) {
    console.error('Error setting sleep mode:', error)
    return null
  }
}

export const wakeMachine = (machineId) => async () => {
  try {
    const response = await api.post(`/v1/machines/${machineId}/wake`)
    return response.data
  } catch (error) {
    console.error('Error waking machine:', error)
    return null
  }
}
