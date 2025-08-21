/**
 * author Anushka Isuru Lakmal
 * created on 25-02-2025-09h-18m
 * copyright 2025
 */

import axios from 'axios'
import { API_BASE_URL } from '../config/config'
// import { io } from 'socket.io-client';
import { FETCH_ALL_ORDERS, FETCH_SALES_BY_ID } from './types'

// let socket = null;

// Modified socket connection without token
// export const connectSocket = () => {
//   if (!socket) {
//     socket = io(API_BASE_URL, {
//       transports: ['websocket']
//     });
//   }
//   return socket;
// };

// export const fetchSaleswithSocket = () => async (dispatch) => {
//   try {
//     // Initialize socket connection
//     const socket = connectSocket();
    
//     // Request orders via socket
//     socket.emit('get_all_orders');
    
//     // Listen for orders data
//     socket.on('all_orders_data', (data) => {
//       dispatch({ type: FETCH_ALL_ORDERS, payload: data });
//     });

//     // Fallback to HTTP request
//     const response = await axios.get(`${API_BASE_URL}/orders`);
//     dispatch({ type: FETCH_ALL_ORDERS, payload: response.data });
    
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// };

export const fetchSales = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_ALL_ORDERS, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error :', error)
    return null
  }
}

export const getOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders`
   ,{
  withCredentials: true,
}
  );
  return await response.json();
};

export const fetchSaleById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orderbyid?id=${id}`,{
  withCredentials: true,
})
    dispatch({ type: FETCH_SALES_BY_ID, payload: response.data })
    return response.data
  } catch (error) {
    console.error('Error adding machine:', error)
    return null
  }
}
