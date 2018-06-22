import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const SET_ACTIVITY = 'SET_ACTIVITY'
const SAVE_PHOTO = 'SAVE_PHOTO'

/**
 * INITIAL STATE
 */
const defaultActivity = {
  photo: '',
  name: '',
  category: '',
  quantity: 0,
  imageUrl: '',
  productId: 1
}

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
    const res = await axios.get(`${ENV_PATH}/api/activity/${activityId}`)
    dispatch(setActivity(res.data || defaultActivity))
  } catch (err) {
    console.error(err)
  }
}

export const addActivityThunk = (activity) => async dispatch => {
  try {
    const res = await axios.post(`${ENV_PATH}/api/activity`, activity)
    dispatch(setActivity(res.data || defaultActivity))
  } catch (err) {
    console.error(err)
  }
}
export const savePhotoThunk = (photo) => async dispatch => {
  try {
    const res = axios.post(`${ENV_PATH}/api/activity/photo`, { photo })
    await dispatch(savePhoto(photo))
    await dispatch(setActivity(res.data || defaultActivity))
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
