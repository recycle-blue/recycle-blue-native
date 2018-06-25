import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const GET_LEADERS = 'GET_LEADERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getLeaders = leaders => ({ type: GET_LEADERS, leaders })
/**
 * THUNK CREATORS
 */

export const getLeadersThunk = (userId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/leaderboard`)
    dispatch(getLeaders(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADERS:
      return action.leaders
    default:
      return state
  }
}
