import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const GET_FRIENDS = 'GET_FRIENDS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getFriends = friends => ({ type: GET_FRIENDS, friends })
/**
 * THUNK CREATORS
 */

export const getFriendsThunk = (userId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/friends`)
    dispatch(getFriends(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    default:
      return state
  }
}
