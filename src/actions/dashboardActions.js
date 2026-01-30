import axios from 'axios'
import { API_BASE_URL } from '../config/config'
import {
  FETCH_DASHBOARD_DATA,
  FETCH_DASHBOARD_DATA_SUCCESS,
  FETCH_DASHBOARD_DATA_ERROR,
  FETCH_ALL_MERCHANTS,
  FETCH_ALL_MERCHANTS_SUCCESS,
  FETCH_ALL_MERCHANTS_ERROR,
  FETCH_CLIENT_STATS,
  FETCH_CLIENT_STATS_SUCCESS,
  FETCH_CLIENT_STATS_ERROR,
  SET_DASHBOARD_FILTERS,
} from './types'

// Set filters
export const setDashboardFilters = (filters) => ({
  type: SET_DASHBOARD_FILTERS,
  payload: filters
})

// Main fetch function with filters and super admin support
export const fetchClientsForDashBoard = (client_id, filters = {}, isSuperAdmin = false) => async (dispatch) => {
  dispatch({ type: FETCH_CLIENT_STATS });
  try {
    const params = new URLSearchParams();
    
    params.append('is_super_admin', isSuperAdmin.toString());
    
    if (client_id && client_id !== 'all') {
      params.append('client_id', client_id);
    }
    
    if (filters.year) params.append('year', filters.year);
    if (filters.month) params.append('month', filters.month);
    
    const urlClientId = (isSuperAdmin || client_id === 'all') ? 'all' : client_id;
    
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/client/${urlClientId}?${params.toString()}`,
      { withCredentials: true }
    );
    
    const transformedData = {
      machineStats: response.data.machineStats || [],
      monthlyBreakdown: response.data.monthlyBreakdown || [],
      merchantCount: response.data.merchantCount || 0,
      orderBreakdown: response.data.orderBreakdown || [],
      monthlyItemAnalysis: response.data.monthlyItemAnalysis || [],
      overallItemStats: response.data.overallItemStats || [],
      availableYears: response.data.availableYears || [],
      filters: response.data.filters || {},
      isSuperAdmin: response.data.isSuperAdmin || false
    };
    
    dispatch({ type: FETCH_CLIENT_STATS_SUCCESS, payload: transformedData });
    return transformedData;
  } catch (error) {
    // Silent error - no console output to avoid popup alerts
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch client dashboard data';
    dispatch({ type: FETCH_CLIENT_STATS_ERROR, payload: errorMessage });
    throw error;
  }
};

// Fetch Dashboard Data with filters and super admin support
export const fetchDashboardData = (client_id, filters = {}, isSuperAdmin = false) => async (dispatch) => {
  dispatch({ type: FETCH_DASHBOARD_DATA })
  try {
    const params = new URLSearchParams();
    
    params.append('is_super_admin', isSuperAdmin.toString());
    
    if (!isSuperAdmin && client_id) {
      params.append('client_id', client_id);
    }
    
    if (filters.year) params.append('year', filters.year);
    if (filters.month) params.append('month', filters.month);
    
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/data?${params.toString()}`,
      { withCredentials: true }
    )
    
    const transformedData = {
      customers: {
        total: response.data.customers?.total || 0,
        monthly: response.data.customers?.monthly || [],
        previous: response.data.customers?.previous || 0
      },
      machines: {
        total: response.data.machines?.total || 0,
        monthlyOrders: response.data.machines?.monthlyOrders || [],
        previous: response.data.machines?.previous || 0
      },
      sales: {
        total: response.data.sales?.total || 0,
        monthly: response.data.sales?.monthly || [],
        previous: response.data.sales?.previous || 0
      },
      orders: {
        total: response.data.orders?.total || 0,
        monthly: response.data.orders?.monthly || [],
        previous: response.data.orders?.previous || 0
      }
    }
    
    dispatch({ type: FETCH_DASHBOARD_DATA_SUCCESS, payload: transformedData })
    return transformedData
  } catch (error) {
    // Silent error - no console output
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch dashboard data'
    dispatch({ type: FETCH_DASHBOARD_DATA_ERROR, payload: errorMessage })
    return null
  }
}

// Fetch All Merchants
export const fetchAllMerchants = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_MERCHANTS })
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/merchants`, {
      withCredentials: true,
    })
    
    const transformedData = {
      total: response.data.total || response.data.length || 0,
      merchants: response.data.merchants || response.data || [],
      previous: response.data.previous || 0
    }
    
    dispatch({ type: FETCH_ALL_MERCHANTS_SUCCESS, payload: transformedData })
    return transformedData
  } catch (error) {
    // Silent error - no console output
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch merchants'
    dispatch({ type: FETCH_ALL_MERCHANTS_ERROR, payload: errorMessage })
    return null
  }
}

// Helper function to fetch all dashboard data at once
export const fetchAllDashboardData = (client_id, filters = {}, isSuperAdmin = false) => async (dispatch) => {
  try {
    const clientData = await dispatch(fetchClientsForDashBoard(client_id, filters, isSuperAdmin))
    const merchantData = await dispatch(fetchAllMerchants())
    
    return {
      clientData,
      merchantData,
    }
  } catch (error) {
    // Silent error - no console output
    throw error
  }
}