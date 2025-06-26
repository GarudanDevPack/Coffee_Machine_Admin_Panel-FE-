/**
 * author Anushka Isuru Lakmal
 * created on 17-02-2025-14h-37m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  ADD_CLIENT,
  DELETE_MACHINE,
  FETCH_ALL_CLIENTS,
  FETCH_CLIENT_BY_ID,
  UPDATE_CLIENT_BY_ID,
} from './types'

export const fetchClients = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientlogs`)
    dispatch({ type: FETCH_ALL_CLIENTS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const fetchClientById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getclientlog/${id}`)
    dispatch({ type: FETCH_CLIENT_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const addClient = (client) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createclient`, client)
    dispatch({ type: ADD_CLIENT, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const updateClientById = (data) => async (dispatch) => {
  try {
    console.log('Updating client with data:', data);

    // ❗ Remove id from URL – backend expects it in body
    const response = await axios.put(`${API_BASE_URL}/updateclient`, data);

    dispatch({ type: UPDATE_CLIENT_BY_ID, payload: response.data.data });
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    return null;
  }
};
export const deleteClient = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteclient`, {
  data: { id }
});
    dispatch({ type: DELETE_MACHINE, payload: id })
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}
