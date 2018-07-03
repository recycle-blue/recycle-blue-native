import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})


/**
 * THUNK CREATORS
 */

export const getCategoriesThunk = () => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/category`)
    dispatch(getCategories(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
