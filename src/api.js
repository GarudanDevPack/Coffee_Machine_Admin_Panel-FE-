/**
 * author Anushka Isuru Lakmal
 * created on 10-02-2025-12h-51m
 * copyright 2025
 */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api' // Replace with your backend URL

export const fetchAllData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data)
    return response.data
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export const getAllData = async (endpoint) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
      console.log(response)
      return response.data;
  } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
  }
};

// Get one data item by ID
export const getOneData = async (endpoint, id) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching data with ID ${id}:`, error);
      throw error;
  }
};

// Get one data item by ID
export const getAllQueryData = async (endpoint, id) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}?${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching data with ID ${id}:`, error);
      throw error;
  }
};

// Create new data (POST request)
export const createData = async (endpoint, data) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
  } catch (error) {
      console.error('Error creating data:', error);
      throw error;
  }
};

// Update data by ID (PUT request)
export const updateData = async (endpoint, id, updatedData) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, updatedData);
      return response.data;
  } catch (error) {
      console.error(`Error updating data with ID ${id}:`, error);
      throw error;
  }
};

// Delete data by ID
export const deleteData = async (endpoint, id) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error deleting data with ID ${id}:`, error);
      throw error;
  }
};
