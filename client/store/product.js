import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const SET_PRODUCT = 'SET_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  name: 'default product',
  points: 0,
  description: '',
  recycleUse: '',
}

/**
 * ACTION CREATORS
 */
export const setProduct = product => ({
  type: SET_PRODUCT,
  product
})


/**
 * THUNK CREATORS
 */
export const getProductThunk = (productId) => async dispatch => {

  try {
    const res = await axios.get(`${ENV_PATH}/api/product/${productId}`)
    dispatch(setProduct(res.data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
