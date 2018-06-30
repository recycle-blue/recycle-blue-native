import React from 'react'
import { connect } from 'react-redux'
import RecycleMarker from './recycle-marker'
import { getDistanceThunk } from '../store/location'

class MarkerDetail extends React.Component {
  componentDidMount() {
    const { userLocation, marker } = this.props
    const destination = `${marker.geometry.location.lat},${
      marker.geometry.location.lng
    }`
    const origin = `${userLocation.latitude},${userLocation.longitude}`
    this.props.getDistance(marker.id, origin, destination)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.marker.id !== this.props.marker.id) {
      const { userLocation, marker } = this.props
      const destination = `${marker.geometry.location.lat},${
        marker.geometry.location.lng
      }`
      const origin = `${userLocation.latitude},${userLocation.longitude}`
      this.props.getDistance(marker.id, origin, destination)
    }
  }

  render() {
    const { marker } = this.props
    return <RecycleMarker marker={marker} />
  }
}

const mapState = state => {
  return {
    distance: state.location.distance,
    userLocation: state.location.userLocation,
  }
}
const mapDispatch = dispatch => {
  return {
    getDistance: (markerId, origin, destination) =>
      dispatch(getDistanceThunk(markerId, origin, destination)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MarkerDetail)
