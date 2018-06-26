import axios from 'axios'
import { ENV_PATH } from '../secrets'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getUsersAction = users => {
  return {
    type: GET_ALL_USERS,
    users,
  }
}

export const getUsersThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${ENV_PATH}/api/users`)
      dispatch(getUsersAction(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

const initialState = {
  users: [],
  selectedUser: {},
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.users }
    default:
      return state
  }
}
