import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */

const GET_FEED = 'GET_FEED'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const getFeed = feed => ({type: GET_FEED, feed})
/**
 * THUNK CREATORS
 */

export const getFeedThunk = (userId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/feed`)
    dispatch(getFeed(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return action.feed
    default:
      return state
  }
}
