import {
  FETCH_ALL_MEMBERSHIPS,
  FETCH_MY_MEMBERSHIP,
  SUBSCRIBE_MEMBERSHIP,
  CANCEL_MEMBERSHIP,
} from '../actions/membershipAction'

const initialState = {
  memberships: [],
  myMembership: null,
  loading: false,
  error: null,
}

const membershipReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_MEMBERSHIPS:
      return { ...state, memberships: action.payload || [] }

    case FETCH_MY_MEMBERSHIP:
      return { ...state, myMembership: action.payload }

    case SUBSCRIBE_MEMBERSHIP:
      return { ...state, myMembership: action.payload }

    case CANCEL_MEMBERSHIP:
      return {
        ...state,
        memberships: state.memberships.filter((m) => m._id !== action.payload),
        myMembership: state.myMembership?._id === action.payload ? null : state.myMembership,
      }

    default:
      return state
  }
}

export default membershipReducer
