import api from '../config/axiosInstance'
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

export const setDashboardFilters = (filters) => ({
  type: SET_DASHBOARD_FILTERS,
  payload: filters,
})

// Fetch main dashboard summary
export const fetchDashboardData = (clientId, filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_DASHBOARD_DATA })
  try {
    const params = new URLSearchParams()
    if (clientId && clientId !== 'all') params.append('clientId', clientId)

    const response = await api.get(`/v1/dashboard/summary?${params.toString()}`)
    const data = response.data

    const transformedData = {
      customers: {
        total: data.totalCustomers || 0,
        monthly: [],
        previous: 0,
      },
      machines: {
        total: data.totalMachines || 0,
        monthlyOrders: [],
        previous: 0,
      },
      sales: {
        total: data.totalRevenue || 0,
        monthly: [],
        previous: 0,
      },
      orders: {
        total: data.totalOrders || 0,
        monthly: [],
        previous: 0,
      },
    }

    dispatch({ type: FETCH_DASHBOARD_DATA_SUCCESS, payload: transformedData })
    return transformedData
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard data'
    dispatch({ type: FETCH_DASHBOARD_DATA_ERROR, payload: errorMessage })
    return null
  }
}

// Fetch client/org dashboard stats
export const fetchClientsForDashBoard = (clientId, filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_CLIENT_STATS })
  try {
    const params = new URLSearchParams()
    if (clientId && clientId !== 'all') params.append('clientId', clientId)
    if (filters.month) params.append('month', filters.month)
    if (filters.year) params.append('year', filters.year)

    const response = await api.get(`/v1/dashboard/summary?${params.toString()}`)
    const data = response.data

    const transformedData = {
      machineStats: data.machinePerformance || [],
      monthlyBreakdown: data.revenueByMachine || [],
      merchantCount: data.totalOrganizations || 0,
      orderBreakdown: data.ordersByStatus || [],
      monthlyItemAnalysis: [],
      overallItemStats: data.topItems || [],
      availableYears: [],
      filters: filters,
    }

    dispatch({ type: FETCH_CLIENT_STATS_SUCCESS, payload: transformedData })
    return transformedData
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch client stats'
    dispatch({ type: FETCH_CLIENT_STATS_ERROR, payload: errorMessage })
    throw error
  }
}

// Fetch all organizations (replaces old merchants)
export const fetchAllMerchants = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_MERCHANTS })
  try {
    const response = await api.get('/v1/organizations')
    const orgs = Array.isArray(response.data) ? response.data : response.data?.data || []

    const transformedData = {
      total: orgs.length,
      merchants: orgs,
      previous: 0,
    }

    dispatch({ type: FETCH_ALL_MERCHANTS_SUCCESS, payload: transformedData })
    return transformedData
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch organizations'
    dispatch({ type: FETCH_ALL_MERCHANTS_ERROR, payload: errorMessage })
    return null
  }
}

export const fetchAllDashboardData = (clientId, filters = {}) => async (dispatch) => {
  try {
    const clientData = await dispatch(fetchClientsForDashBoard(clientId, filters))
    const merchantData = await dispatch(fetchAllMerchants())
    return { clientData, merchantData }
  } catch (error) {
    throw error
  }
}
