import axios from 'axios'
import { ENV_PATH } from '../secrets'
// import history from '../history'
// const ENV_PATH = 'localhost://8080'

/**
 * ACTION TYPES
 */
const GET_USER_PROGRESS = 'GET_USER_PROGRESS'

/**
 * INITIAL STATE
 */
const defualtProgress = {
  totalPoints: 0
}

/**
 * ACTION CREATORS
 */
const getUserProgress = progress => ({
  type: GET_USER_PROGRESS, progress,
})

/**
 * THUNK CREATORS
 */
export const getUserProgressThunk = (userId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/user/${userId}`)
    dispatch(getUserProgress(res.data || defualtProgress))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defualtProgress, action) {

  switch (action.type) {
    case GET_USER_PROGRESS:
      console.log(action.progress)
      return { ...state, totalPoints: action.progress }
    default:
      return state
  }
}
