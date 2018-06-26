import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const SET_AD = 'SET_AD'
// const CLEAR_AD = 'CLEAR_AD'
// const SET_AD_WEEK = 'SET_AD_WEEK'


/**
 * INITIAL STATE
 */
const defaultAd = {
  activityId: 1,
  address: '',
  city: '',
  state: '',
  zipCode: 0,
  email: '',
  phone: '',
  description: '',
}

/**
 * ACTION CREATORS
 */
export const setAd = ad => ({
  type: SET_AD,
  ad
})
// const setAdWeek = activities => ({
//   type: SET_AD_WEEK,
//   activities
// })
// export const clearAdAction = () => ({ type: CLEAR_AD })
/**
 * THUNK CREATORS
 */

// export const setAdWeekThunk = (userId) => async dispatch => {
//   try {
//     const res = await axios.get(`${ENV_PATH}/api/activity/ad/weekly/${userId}`)
//     dispatch(setAdWeek(res.data || defaultAd))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const addAdThunk = (ad) => async dispatch => {
  try {
    const res = await axios.post(`${ENV_PATH}/api/activity/ad`, ad)
    dispatch(setAd(res.data || defaultAd))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultAd, action) {
  switch (action.type) {
    case SET_AD:
      return { ...state, ...action.ad }
    // case SET_AD_WEEK:
    //   return action.activities
    // case CLEAR_AD:
    //   return { ...defaultAd }
    default:
      return state
  }
}
