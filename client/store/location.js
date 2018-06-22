import axios from 'axios'
import { googleAPIKey } from '../secrets'

const GET_RECYCLE_LOCATIONS = 'GET_RECYCLE_LOCATIONS'
const GET_USER_LOCATION = 'GET_USER_LOCATION'
const GET_DISTANCE = 'GET_DISTANCE'
const SELECT_MARKER = 'SELECT_MARKER'

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
const getDistanceAction = (distance, markerId) => {
  return {
    type: GET_DISTANCE,
    distance,
    markerId,
  }
}
export const selectMarkerAction = marker => {
  return {
    type: SELECT_MARKER,
    marker,
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
export const getDistanceThunk = (markerId, origin, destination) => {
  return async dispatch => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${googleAPIKey}`
    )
    dispatch(
      getDistanceAction(data.rows[0].elements[0].distance.text, markerId)
    )
  }
}

const defaultLocation = {
  latitude: 41.8956689,
  longitude: -87.6394469,
}

const initialState = {
  recycleLocations: [],
  userLocation: defaultLocation,
  selectedMarker: {},
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECYCLE_LOCATIONS:
      return { ...state, recycleLocations: action.locations }
    case GET_USER_LOCATION:
      return { ...state, userLocation: action.location }
    case GET_DISTANCE:
      const updatedRecycleLocations = state.recycleLocations.map(location => {
        if (location.id === action.markerId) {
          return { ...location, distance: action.distance }
        } else {
          return location
        }
      })
      return { ...state, recycleLocations: updatedRecycleLocations }
    case SELECT_MARKER:
      return { ...state, selectedMarker: action.marker }
    default:
      return state
  }
}
