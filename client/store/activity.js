import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ACTIVITY = 'SET_ACTIVITY'

/**
 * INITIAL STATE
 */
const defaultActivity = {}

/**
 * ACTION CREATORS
 */
const setActivity = activity => ({
  type: SET_ACTIVITY, activity
})

/**
 * THUNK CREATORS
 */
export const getActivityThunk = (activityId) => async dispatch => {
  try {
    const res = await axios.get(`/api/activity/${activityId}`)
    dispatch(setActivity(res.data || defaultActivity))
  } catch (err) {
    console.error(err)
  }
}

export const setActivityThunk = (activity) => async dispatch => {
  try {
    const res = await axios.post('/api/activity', activity)
    dispatch(setActivity(res.data || defaultActivity))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultActivity, action) {
  switch (action.type) {
    case SET_ACTIVITY:
      return action.activity
    default:
      return state
  }
}
