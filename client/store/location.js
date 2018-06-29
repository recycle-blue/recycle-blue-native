import axios from 'axios'
import { googleAPIKey, ENV_PATH } from '../secrets'

const GET_LOCATIONS = 'GET_LOCATIONS'
const GET_USER_LOCATION = 'GET_USER_LOCATION'
const GET_DISTANCE = 'GET_DISTANCE'
const SELECT_MARKER = 'SELECT_MARKER'
const SET_FETCH = 'SET_FETCH'

const getLocationsAction = locations => {
  return {
    type: GET_LOCATIONS,
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
export const setFetch = status => {
  return {
    type: SET_FETCH,
    status,
  }
}

export const getRecycleLocationsThunk = locationStr => {
  return async dispatch => {
    console.log('recycle thunk called')
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationStr}&keyword=recycle&radius=3000&key=${googleAPIKey}`
    )
    dispatch(getLocationsAction(data.results))
  }
}
export const getAdLocationsThunk = locationStr => {
  return async dispatch => {
    console.log('ad thunk called')
    const { data } = await axios.get(
      `${ENV_PATH}/api/activity/marketplace?location=${locationStr}`
    )
    dispatch(getLocationsAction(data))
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
  locations: [],
  userLocation: defaultLocation,
  selectedMarker: {},
  isFetching: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return { ...state, locations: action.locations }
    case GET_USER_LOCATION:
      return { ...state, userLocation: action.location }
    case GET_DISTANCE:
      return {
        ...state,
        selectedMarker: { ...state.selectedMarker, distance: action.distance },
      }
    case SELECT_MARKER:
      return { ...state, selectedMarker: action.marker }
    case SET_FETCH:
      return { ...state, isFetching: action.status }
    default:
      return state
  }
}
