/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-11h-28m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  ADD_MACHINE,
  DELETE_MACHINE,
  FETCH_ALL_MACHINES,
  FETCH_MACHINE_BY_ID,
  UPDATE_MACHINE_BY_ID,
  UPDATE_MACHINE_STATUS,
} from './types'

export const fetchMachines = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getallmachinelogs`)
    dispatch({ type: FETCH_ALL_MACHINES, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const fetchMachineById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getmachinelog/${id}`)
    dispatch({ type: FETCH_MACHINE_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const addMachine = (machines) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createmachinelog`, machines)
    dispatch({ type: ADD_MACHINE, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const updateMachineById = (id, machine) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updatemachinelog?id=${id}`, machine)
    dispatch({ type: UPDATE_MACHINE_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const updateMachinestatus = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updatemachinelogstatus/${id}`)
    dispatch({ type: UPDATE_MACHINE_STATUS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}

export const deleteMachine = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deletemachinelog?id=${id}`)
    dispatch({ type: DELETE_MACHINE, payload: id })
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}
