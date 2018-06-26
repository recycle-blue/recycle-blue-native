import axios from 'axios'
import { ENV_PATH } from '../secrets'
import { setProduct, setCategory } from '.'

/**
 * ACTION TYPES
 */
const SET_ACTIVITY = 'SET_ACTIVITY'
const SAVE_PHOTO = 'SAVE_PHOTO'
const SET_ACTIVITY_WEEK = 'SET_ACTIVITY_WEEK'
const CLEAR_ACTIVITY = 'CLEAR_ACTIVITY'

/**
 * INITIAL STATE
 */
const defaultActivity = {
  photo: '',
  name: 'default',
  category: 'default',
  quantity: 0,
  imageUrl: '',
  unit: 'QTY',
  type: 'Post',
  productId: 1
}

/**
 * ACTION CREATORS
 */
const setActivity = activity => ({
  type: SET_ACTIVITY,
  activity
})
const setActivityWeek = activities => ({
  type: SET_ACTIVITY_WEEK,
  activities
})

const savePhoto = photo => ({
  type: SAVE_PHOTO, photo
})
export const clearActivityAction = () => ({ type: CLEAR_ACTIVITY })
/**
 * THUNK CREATORS
 */

export const setActivityWeekThunk = (userId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/activity/weekly/${userId}`)
    dispatch(setActivityWeek(res.data || defaultActivity))
  } catch (err) {
    console.error(err)
  }
}

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
    if (res.data.updateRequired) {
      dispatch(setProduct(res.data.product))
      dispatch(setCategory(res.data.categoryList[0]))
    }
  } catch (err) {
    console.error(err)
  }
}
export const savePhotoThunk = (photo) => async dispatch => {
  try {
    dispatch(savePhoto(photo))
    const res = await axios.post(`${ENV_PATH}/api/activity/photo`, { photo })
    console.log('savePhotoRes', res)
    console.log('savePhotoRes .data', res.data)
    const category = res.data.categoryList.length ? res.data.categoryList[0].name : 'Plastic'
    await dispatch(setActivity({
      name: res.data.product.name,
      category,
      imageUrl: res.data.imageUrl,
      productId: res.data.product.id
    }))
    await dispatch(setProduct(res.data.product))
    await dispatch(setCategory(category))
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
      return { ...state, ...action.activity }
    case SAVE_PHOTO:
      return { ...state, photo: action.photo }
    case SET_ACTIVITY_WEEK:
      return action.activities
    case CLEAR_ACTIVITY:
      return { ...defaultActivity }
    default:
      return state
  }
}
