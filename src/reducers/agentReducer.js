import {
  FETCH_ALL_AGENTS,
  FETCH_AGENT_BY_ID,
  APPROVE_AGENT,
} from '../actions/agentAction'

const initialState = {
  agents: [],
  selectedAgent: null,
}

const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_AGENTS:
      return { ...state, agents: action.payload || [] }

    case FETCH_AGENT_BY_ID:
      return { ...state, selectedAgent: action.payload }

    case APPROVE_AGENT:
      return {
        ...state,
        agents: state.agents.map((a) =>
          a._id === action.payload._id ? action.payload : a,
        ),
      }

    default:
      return state
  }
}

export default agentReducer
