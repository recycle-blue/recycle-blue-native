import axios from 'axios'
import { ENV_PATH } from '../secrets'

/**
 * ACTION TYPES
 */
const SET_AD = 'SET_AD'
const SET_MARKETPLACE_ADS = 'SET_MARKETPLACE_ADS'


/**
 * INITIAL STATE
 */
const defaultAd = {
  activityId: 1,
  address: '',
  city: '',
  state: '',
  zipCode: '',
  email: '',
  phone: '',
  description: '',
  marketplace: []
}

/**
 * ACTION CREATORS
 */
export const setAd = ad => ({
  type: SET_AD,
  ad
})
const setMarketplaceAds = marketplace => ({
  type: SET_MARKETPLACE_ADS,
  marketplace
})

export const getMarketplaceAdsThunk = (location) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/activity/marketplace/?location=${location}`)
    dispatch(setMarketplaceAds(res.data || defaultAd))
  } catch (err) {
    console.error(err)
  }
}

export const addAdThunk = (ad) => async dispatch => {
  try {
    const res = await axios.post(`${ENV_PATH}/api/activity/ad`, ad)
    dispatch(setAd(res.data || defaultAd))
  } catch (err) {
    console.error(err)
  }
}
export const getAdThunk = (activityId) => async dispatch => {
  try {
    const res = await axios.get(`${ENV_PATH}/api/activity/${activityId}/ad`)
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
    case SET_MARKETPLACE_ADS:
      return { marketplace: action.marketplace }
    default:
      return state
  }
}
