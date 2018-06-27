import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getFriends = friends => ({ type: GET_FRIENDS, friends })
const addFriend = friend => {
  return {
    type: ADD_FRIEND,
    friend,
  }
}
/**
 * THUNK CREATORS
 */

export const getFriendsThunk = userId => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/friends`)
    dispatch(getFriends(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const addFriendThunk = (currentUserId, selectedUserId) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(
        `${ENV_PATH}/api/users/${currentUserId}/friends/${selectedUserId}`
      )
      dispatch(addFriend(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    case ADD_FRIEND:
      return [...state, action.friend]
    default:
      return state
  }
}
