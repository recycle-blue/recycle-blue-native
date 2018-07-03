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
  id: 1,
  name: 'a',
  category: '',
  photo: '',
  quantity: '1',
  imageUrl: 'default',
  unit: 'qty',
  type: 'activity',
  productId: 1,
  categoryId: 1,
  activities: [],
}

/**
 * ACTION CREATORS
 */
export const setActivity = activity => ({
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

export const addActivityThunk = (activity) => async dispatch => {
  try {
    const res = await axios.post(`${ENV_PATH}/api/activity`, activity)
    await dispatch(setActivity(res.data.activity || defaultActivity))
    await dispatch(setProduct(res.data.product))
    await dispatch(setCategory(res.data.category))
    await dispatch(setActivityWeekThunk(res.data.activity.userId))
  } catch (err) {
    console.error(err)
  }
}

export const savePhotoThunk = (photo) => async dispatch => {
  try {
    dispatch(savePhoto(photo))
    const res = await axios.post(`${ENV_PATH}/api/activity/photo`, { photo })
    await dispatch(setActivity({
      name: res.data.product.name,
      imageUrl: res.data.imageUrl,
      categoryId: res.data.category.id,
      productId: res.data.product.id
    }))
    await dispatch(setProduct(res.data.product))
    await dispatch(setCategory(res.data.category))
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
      return { photo: action.photo }
    case SET_ACTIVITY_WEEK:
      return { ...state, activities: action.activities }
    case CLEAR_ACTIVITY:
      return { ...defaultActivity }
    default:
      return state
  }
}
