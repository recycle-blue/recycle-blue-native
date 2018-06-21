import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ACTIVITY = 'SET_ACTIVITY'
const SAVE_PHOTO = 'SAVE_PHOTO'

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
const savePhoto = photo => ({
  type: SAVE_PHOTO, photo
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
export const savePhotoThunk = (photo) => async dispatch => {
  try {
    const res = await axios.post('/api/activity/photo', photo)
    // dispatch(setActivity(res.data || defaultActivity))
    console.log('store photo', photo)
    await dispatch(savePhoto(photo))
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
      return { ...state, activity: action.activity }
    case SAVE_PHOTO:
      return { ...state, photo: action.photo }
    default:
      return state
  }
}
