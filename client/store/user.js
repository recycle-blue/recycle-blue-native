import axios from 'axios'
import { ENV_PATH } from '../secrets'
// import history from '../history'

// /**
//  * ACTION TYPES
//  */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


/**
 * INITIAL STATE
 */
const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  totalPoints: 0,
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, firstName, lastName) => async dispatch => {
  let res
  try {
    res = await axios.post(`${ENV_PATH}/auth/${method}`, { email, password, firstName, lastName })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post(`${ENV_PATH}/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}


export const getMeThunk = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${ENV_PATH}/api/users/${userId}`)

      dispatch(getUser(data))
    } catch (err) {
      console.error(err.message)
    }
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
