import axios from 'axios'
import { googleAPIKey } from '../secrets'

const GET_RECYCLE_LOCATIONS = 'GET_RECYCLE_LOCATIONS'
const GET_USER_LOCATION = 'GET_USER_LOCATION'
const GET_DISTANCE = 'GET_DISTANCE'

const getRecycleLocationsAction = locations => {
  return {
    type: GET_RECYCLE_LOCATIONS,
    locations,
  }
}
export const getUserLocationAction = location => {
  return {
    type: GET_USER_LOCATION,
    location,
  }
}
const getDistanceAction = distance => {
  return {
    type: GET_DISTANCE,
    distance,
  }
}

export const getRecycleLocationsThunk = locationStr => {
  return async dispatch => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationStr}&keyword=recycle&radius=3000&key=${googleAPIKey}`
    )
    dispatch(getRecycleLocationsAction(data.results))
  }
}
export const getDistanceThunk = (origin, destination) => {
  return async dispatch => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.8956689,-87.6394469&destinations=place_id:ChIJe_o2hCR-j4ARxSNVkQ7Fw2k&units=imperial&key=${googleAPIKey}`
    )
    dispatch(getDistanceAction(data.rows[0].elements[0].distance.text))
  }
}

const defaultLocation = {
  latitude: 41.8956689,
  longitude: -87.6394469,
}

const initialState = {
  recycleLocations: [],
  userLocation: defaultLocation,
  distance: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECYCLE_LOCATIONS:
      return { ...state, recycleLocations: action.locations }
    case GET_USER_LOCATION:
      return { ...state, userLocation: action.location }
    case GET_DISTANCE:
      return { ...state, distance: action.distance }
    default:
      return state
  }
}
