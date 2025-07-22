import {
  FETCH_ALL_WALLETS
} from '../actions/types'

const initialState = {
  wallets: {},
  walletsarr: [],
  wallet: null,
}

const customerWalletsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_WALLETS:
      return {
        ...state,
        wallets: action.payload,
      }
   
    default:
      return state
  }
}

export default customerWalletsReducer
