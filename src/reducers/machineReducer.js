import {
  ADD_MACHINE,
  DELETE_MACHINE,
  FETCH_ALL_MACHINES,
  FETCH_MACHINE_BY_ID,
  UPDATE_MACHINE_BY_ID,
  UPDATE_MACHINE_STATUS,
} from '../actions/types'

const initialState = {
  machines: {},
  machinearr: [],
  machine: null,
}

const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_MACHINES:
      return {
        ...state,
        machines: action.payload,
      }
    case FETCH_MACHINE_BY_ID:
      return {
        ...state,
        machine: action.payload,
      }
    case ADD_MACHINE:
      return {
        ...state,
        machines: { ...state.machines, ...action.payload },
      }
    case UPDATE_MACHINE_BY_ID:
    case UPDATE_MACHINE_STATUS:
      return {
        ...state,
        machines: state.machines.map((machine) =>
          machine.id === action.payload.id ? action.payload : machine,
        ),
      }
    case DELETE_MACHINE:
      return {
        ...state,
        machines: state.machines.filter((machine) => machine.id !== action.payload),
      }
    default:
      return state
  }
}

export default machineReducer
