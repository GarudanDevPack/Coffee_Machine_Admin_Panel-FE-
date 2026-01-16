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
// } from '../actions/types'

// const initialState = {
//   // Client Stats
//   clientStats: {
//     machineStats: [],
//     monthlyBreakdown: [],
//     merchantCount: 0,
//     orderBreakdown: []
//   },
  
//   // Merchants
//   merchants: {
//     total: 0,
//     merchants: [],
//     previous: 0
//   },
  
//   // Dashboard Data
//   dashboardData: {
//     customers: { total: 0, monthly: [], previous: 0 },
//     machines: { total: 0, monthlyOrders: [], previous: 0 },
//     sales: { total: 0, monthly: [], previous: 0 },
//     orders: { total: 0, monthly: [], previous: 0 }
//   },
  
//   // Loading states
//   loading: {
//     clientStats: false,
//     merchants: false,
//     dashboardData: false
//   },
  
//   // Error states
//   errors: {
//     clientStats: null,
//     merchants: null,
//     dashboardData: null
//   }
// }

// const dashboardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // CLIENT STATS
//     case FETCH_CLIENT_STATS:
//       return {
//         ...state,
//         loading: {
//           ...state.loading,
//           clientStats: true
//         },
//         errors: {
//           ...state.errors,
//           clientStats: null
//         }
//       }
    
//     case FETCH_CLIENT_STATS_SUCCESS:
//       return {
//         ...state,
//         clientStats: action.payload,
//         loading: {
//           ...state.loading,
//           clientStats: false
//         },
//         errors: {
//           ...state.errors,
//           clientStats: null
//         }
//       }
    
//     case FETCH_CLIENT_STATS_ERROR:
//       return {
//         ...state,
//         loading: {
//           ...state.loading,
//           clientStats: false
//         },
//         errors: {
//           ...state.errors,
//           clientStats: action.payload
//         }
//       }

//     // MERCHANTS
//     case FETCH_ALL_MERCHANTS:
//       return {
//         ...state,
//         loading: {
//           ...state.loading,
//           merchants: true
//         },
//         errors: {
//           ...state.errors,
//           merchants: null
//         }
//       }
    
//     case FETCH_ALL_MERCHANTS_SUCCESS:
//       return {
//         ...state,
//         merchants: action.payload,
//         loading: {
//           ...state.loading,
//           merchants: false
//         },
//         errors: {
//           ...state.errors,
//           merchants: null
//         }
//       }
    
//     case FETCH_ALL_MERCHANTS_ERROR:
//       return {
//         ...state,
//         loading: {
//           ...state.loading,
//           merchants: false
//         },
//         errors: {
//           ...state.errors,
//           merchants: action.payload
//         }
//       }

//     // DASHBOARD DATA
//     case FETCH_DASHBOARD_DATA:
//       return {
//         ...state,
//         loading: {
//           ...state.loading,
//           dashboardData: true
//         },
//         errors: {
//           ...state.errors,
//           dashboardData: null
//         }
//       }
    
//     case FETCH_DASHBOARD_DATA_SUCCESS:
//       return {
//         ...state,
//         dashboardData: action.payload,
//         loading: {
//           ...state.loading,
//           dashboardData: false
//         },
//         errors: {
//           ...state.errors,
//           dashboardData: null
//         }
//       }
    
//     case FETCH_DASHBOARD_DATA_ERROR:
//       return {
//         ...state,
//         loading: {
//           ...state.loading,
//           dashboardData: false
//         },
//         errors: {
//           ...state.errors,
//           dashboardData: action.payload
//         }
//       }

//     default:
//       return state
//   }
// }

// export default dashboardReducer
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
} from '../actions/types'

const initialState = {
  // Client Stats
  clientStats: {
    machineStats: [],
    monthlyBreakdown: [],
    merchantCount: 0,
    orderBreakdown: [],
    monthlyItemAnalysis: [],
    overallItemStats: [],
    availableYears: []
  },
  
  // Merchants
  merchants: {
    total: 0,
    merchants: [],
    previous: 0
  },
  
  // Dashboard Data
  dashboardData: {
    customers: { total: 0, monthly: [], previous: 0 },
    machines: { total: 0, monthlyOrders: [], previous: 0 },
    sales: { total: 0, monthly: [], previous: 0 },
    orders: { total: 0, monthly: [], previous: 0 }
  },
  
  // Filters
  filters: {
    year: new Date().getFullYear(),
    month: null
  },
  
  // Loading states
  loading: {
    clientStats: false,
    merchants: false,
    dashboardData: false
  },
  
  // Error states
  errors: {
    clientStats: null,
    merchants: null,
    dashboardData: null
  }
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // CLIENT STATS
    case FETCH_CLIENT_STATS:
      return {
        ...state,
        loading: {
          ...state.loading,
          clientStats: true
        },
        errors: {
          ...state.errors,
          clientStats: null
        }
      }
    
    case FETCH_CLIENT_STATS_SUCCESS:
      return {
        ...state,
        clientStats: action.payload,
        loading: {
          ...state.loading,
          clientStats: false
        },
        errors: {
          ...state.errors,
          clientStats: null
        }
      }
    
    case FETCH_CLIENT_STATS_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          clientStats: false
        },
        errors: {
          ...state.errors,
          clientStats: action.payload
        }
      }

    // MERCHANTS
    case FETCH_ALL_MERCHANTS:
      return {
        ...state,
        loading: {
          ...state.loading,
          merchants: true
        },
        errors: {
          ...state.errors,
          merchants: null
        }
      }
    
    case FETCH_ALL_MERCHANTS_SUCCESS:
      return {
        ...state,
        merchants: action.payload,
        loading: {
          ...state.loading,
          merchants: false
        },
        errors: {
          ...state.errors,
          merchants: null
        }
      }
    
    case FETCH_ALL_MERCHANTS_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          merchants: false
        },
        errors: {
          ...state.errors,
          merchants: action.payload
        }
      }

    // DASHBOARD DATA
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        loading: {
          ...state.loading,
          dashboardData: true
        },
        errors: {
          ...state.errors,
          dashboardData: null
        }
      }
    
    case FETCH_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
        loading: {
          ...state.loading,
          dashboardData: false
        },
        errors: {
          ...state.errors,
          dashboardData: null
        }
      }
    
    case FETCH_DASHBOARD_DATA_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          dashboardData: false
        },
        errors: {
          ...state.errors,
          dashboardData: action.payload
        }
      }

    // FILTERS
    case SET_DASHBOARD_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      }

    default:
      return state
  }
}

export default dashboardReducer