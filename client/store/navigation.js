// import axios from 'axios'
// import history from '../history'
import AppNavigation from '../navigation'
/**
 * ACTION TYPES
 */
const GET_NAV = 'GET_NAV'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialNav = {}

/**
 * ACTION CREATORS
 */
const getNav = nav => ({ type: GET_NAV, nav })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialNav))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialNav, action) {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState
  // switch (action.type) {
  //   case GET_NAV:
  //     return action.nav
  //   default:
  //     return state
  // }
}
