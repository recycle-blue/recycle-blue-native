import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_DATA = 'GET_USER_DATA'

/**
 * ACTION CREATORS
 */
const getUserData = user => ({ type: GET_USER_user, user })


/**
 * THUNK CREATORS
 */

export const getUserDataServer = (userId, user) => {
  return async dispatch => {
    const { data } = await axios.put(`/api/users/${userId}`, user)
    dispatch(updateUser(data))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
