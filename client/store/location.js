import axios from 'axios'
import { googleAPIKey } from '../secrets'

const GET_RECYCLE_LOCATIONS = 'GET_RECYCLE_LOCATIONS'

const getRecycleLocationsAction = locations => {
  return {
    type: GET_RECYCLE_LOCATIONS,
    locations,
  }
}

export const getRecycleLocationsThunk = () => {
  return async dispatch => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.895766,-87.638865&keyword=recycle&radius=3000&key=${googleAPIKey}`
    )
    dispatch(getRecycleLocationsAction(data.results))
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECYCLE_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
