import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  name: '',
  points: 0,
  description: '',
  recycleUse: '',
}

/**
 * ACTION CREATORS
 */
const getProductById = product => ({
  type: GET_ACTIVITY,
  product
})


/**
 * THUNK CREATORS
 */
export const getProductThunk = (productId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/product/${productId}`)
    dispatch(getProductById(res.data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_ID:
      return action.product
    default:
      return state
  }
}
