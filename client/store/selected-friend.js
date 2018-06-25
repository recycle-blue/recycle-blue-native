import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */

const SELECTED_FRIEND = 'SELECTED_FRIEND'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const selectFriend = friend => ({type: SELECTED_FRIEND, friend})
/**
 * THUNK CREATORS
 */

export const selectedFriendThunk = (userId, friendId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/friends/${friendId}`)
    dispatch(selectFriend(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SELECTED_FRIEND:
      return action.friend
    default:
      return state
  }
}
