import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const GET_USER_ACTIVITIES = 'GET_USER_ACTIVITIES'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getUserActivities = activities => ({ type: GET_USER_ACTIVITIES, activities })
/**
 * THUNK CREATORS
 */

export const getUserActivitiesThunk = (userId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/activities`)
    dispatch(getUserActivities(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const selectedFriendActivitiesThunk = (userId, friendId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/users/${userId}/friends/${friendId}/activities`)
    dispatch(getUserActivities(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_ACTIVITIES:
      return action.activities
    default:
      return state
  }
}
