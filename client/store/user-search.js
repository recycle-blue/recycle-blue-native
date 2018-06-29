import axios from 'axios'
import { ENV_PATH } from '../secrets'

const GET_ALL_USERS = 'GET_ALL_USERS'
const SELECT_USER = 'SELECT_USER'
const GET_FRIENDS_HASH = 'GET_FRIENDS_HASH'

const getUsersAction = users => {
  return {
    type: GET_ALL_USERS,
    users,
  }
}
export const selectUserAction = user => {
  return {
    type: SELECT_USER,
    user,
  }
}
const getFriendsAction = friends => {
  return {
    type: GET_FRIENDS_HASH,
    friends,
  }
}

export const getUsersThunk = (text) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${ENV_PATH}/api/users/search?name=${text}`)
      dispatch(getUsersAction(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}
export const getUserThunk = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${ENV_PATH}/api/users/${userId}`)
      dispatch(selectUserAction(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const getFriendsHashThunk = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${ENV_PATH}/api/users/${userId}/friends?res=hash`
      )
      return dispatch(getFriendsAction(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

const initialState = {
  users: [],
  selectedUser: {},
  friends: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.users }
    case SELECT_USER:
      return { ...state, selectedUser: action.user }
    case GET_FRIENDS_HASH:
      return { ...state, friends: action.friends }
    default:
      return state
  }
}
