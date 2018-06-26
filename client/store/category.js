import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const SET_CATEGORY = 'SET_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategory = {
  name: 'default category',
  multiplier: 1,
  description: '',
}

/**
 * ACTION CREATORS
 */
export const setCategory = category => ({
  type: SET_CATEGORY,
  category
})


/**
 * THUNK CREATORS
 */
// export const getCategoryThunk = (categoryId) => async dispatch => {

//   try {
//     const res = await axios.get(`${ENV_PATH}/api/category/${categoryId}`)
//     dispatch(setCategory(res.data || defaultCategory))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function (state = defaultCategory, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category
    default:
      return state
  }
}
