
// import axios from 'axios'
// import { API_BASE_URL } from '../config/config'
// import {
//   FETCH_DASHBOARD_DATA,
//   FETCH_DASHBOARD_DATA_SUCCESS,
//   FETCH_DASHBOARD_DATA_ERROR,
//   FETCH_ALL_MERCHANTS,
//   FETCH_ALL_MERCHANTS_SUCCESS,
//   FETCH_ALL_MERCHANTS_ERROR,
//   FETCH_CLIENT_STATS,
//   FETCH_CLIENT_STATS_SUCCESS,
//   FETCH_CLIENT_STATS_ERROR,
// } from './types'

// // Main fetch function that combines client dashboard and stats
// export const fetchClientsForDashBoard = (client_id) => async (dispatch) => {
//   dispatch({ type: FETCH_CLIENT_STATS });
//   try {
//     const response = await axios.get(`${API_BASE_URL}/dashboard/client/${client_id}`, {
//   withCredentials: true,
// });
//     const transformedData = {
//       machineStats: response.data.machineStats || [],
//       monthlyBreakdown: response.data.monthlyBreakdown || [],
//       merchantCount: response.data.merchantCount || 0,
//       orderBreakdown: response.data.orderBreakdown || [],
//       monthlyItemAnalysis:response.data.monthlyItemAnalysis || [],
//       overallItemStats: response.data.overallItemStats || [],
//     };
//     dispatch({ type: FETCH_CLIENT_STATS_SUCCESS, payload: transformedData });
//     return transformedData; // Return the data directly
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch client dashboard data';
//     dispatch({ type: FETCH_CLIENT_STATS_ERROR, payload: errorMessage });
//     throw error; // Throw the error to be caught in the component
//   }
// };
// // Fetch Dashboard Data (if you have a separate endpoint)
// export const fetchDashboardData = (client_id) => async (dispatch) => {
//   dispatch({ type: FETCH_DASHBOARD_DATA })
//   try {
//     const response = await axios.get(`${API_BASE_URL}/dashboard/data/${client_id}`, {
//   withCredentials: true,
// })
    
//     const transformedData = {
//       customers: {
//         total: response.data.customers?.total || 0,
//         monthly: response.data.customers?.monthly || [],
//         previous: response.data.customers?.previous || 0
//       },
//       machines: {
//         total: response.data.machines?.total || 0,
//         monthlyOrders: response.data.machines?.monthlyOrders || [],
//         previous: response.data.machines?.previous || 0
//       },
//       sales: {
//         total: response.data.sales?.total || 0,
//         monthly: response.data.sales?.monthly || [],
//         previous: response.data.sales?.previous || 0
//       },
//       orders: {
//         total: response.data.orders?.total || 0,
//         monthly: response.data.orders?.monthly || [],
//         previous: response.data.orders?.previous || 0
//       }
//     }
    
//     dispatch({ type: FETCH_DASHBOARD_DATA_SUCCESS, payload: transformedData })
//     return transformedData
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error)
//     const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch dashboard data'
//     dispatch({ type: FETCH_DASHBOARD_DATA_ERROR, payload: errorMessage })
//     return null
//   }
// }

// // Fetch All Merchants
// export const fetchAllMerchants = () => async (dispatch) => {
//   dispatch({ type: FETCH_ALL_MERCHANTS })
//   try {
//     const response = await axios.get(`${API_BASE_URL}/dashboard/merchants`, {
//   withCredentials: true,
// })
    
//     console.log('Fetched merchants:', response.data)
    
//     const transformedData = {
//       total: response.data.total || response.data.length || 0,
//       merchants: response.data.merchants || response.data || [],
//       previous: response.data.previous || 0
//     }
    
//     dispatch({ type: FETCH_ALL_MERCHANTS_SUCCESS, payload: transformedData })
//     return transformedData
//   } catch (error) {
//     console.error('Error fetching merchants:', error)
//     const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch merchants'
//     dispatch({ type: FETCH_ALL_MERCHANTS_ERROR, payload: errorMessage })
//     return null
//   }
// }

// // Fetch Client Stats (separate from main dashboard if needed)
// export const fetchClientStats = (client_id) => async (dispatch) => {
//   dispatch({ type: FETCH_CLIENT_STATS })
//   try {
//     const response = await axios.get(`${API_BASE_URL}/dashboard/client/${client_id}/stats`, {
//   withCredentials: true,
// })
    
//     const transformedData = {
//       machineStats: response.data.machineStats || [],
//       monthlyBreakdown: response.data.monthlyBreakdown || [],
//       merchantCount: response.data.merchantCount || 0,
//       orderBreakdown: response.data.orderBreakdown || []
//     }
    
//     dispatch({ type: FETCH_CLIENT_STATS_SUCCESS, payload: transformedData })
//     return transformedData
//   } catch (error) {
//     console.error('Error fetching client stats:', error)
//     const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch client stats'
//     dispatch({ type: FETCH_CLIENT_STATS_ERROR, payload: errorMessage })
//     return null
//   }
// }

// // Helper function to fetch all dashboard data at once
// export const fetchAllDashboardData = (client_id) => async (dispatch) => {
//   try {
//     // Fetch main client dashboard data
//     const clientData = await dispatch(fetchClientsForDashBoard(client_id))
    
//     // Fetch merchants data
//     const merchantData = await dispatch(fetchAllMerchants())
    
//     // If you have a separate dashboard endpoint, uncomment this:
//     // const dashboardData = await dispatch(fetchDashboardData(client_id))
    
//     return {
//       clientData,
//       merchantData,
//       // dashboardData
//     }
//   } catch (error) {
//     console.error('Error fetching all dashboard data:', error)
//     throw error
//   }
// }
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

// Main fetch function with filters
export const fetchClientsForDashBoard = (client_id, filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_CLIENT_STATS });
  try {
    const params = new URLSearchParams();
    if (filters.year) params.append('year', filters.year);
    if (filters.month) params.append('month', filters.month);
    
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/client/${client_id}?${params.toString()}`,
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
      filters: response.data.filters || {}
    };
    
    dispatch({ type: FETCH_CLIENT_STATS_SUCCESS, payload: transformedData });
    return transformedData;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch client dashboard data';
    dispatch({ type: FETCH_CLIENT_STATS_ERROR, payload: errorMessage });
    throw error;
  }
};

// Fetch Dashboard Data with filters
export const fetchDashboardData = (client_id, filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_DASHBOARD_DATA })
  try {
    const params = new URLSearchParams({ client_id });
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
    console.error('Error fetching dashboard data:', error)
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
    console.error('Error fetching merchants:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch merchants'
    dispatch({ type: FETCH_ALL_MERCHANTS_ERROR, payload: errorMessage })
    return null
  }
}

// Helper function to fetch all dashboard data at once
export const fetchAllDashboardData = (client_id, filters = {}) => async (dispatch) => {
  try {
    const clientData = await dispatch(fetchClientsForDashBoard(client_id, filters))
    const merchantData = await dispatch(fetchAllMerchants())
    
    return {
      clientData,
      merchantData,
    }
  } catch (error) {
    console.error('Error fetching all dashboard data:', error)
    throw error
  }
}