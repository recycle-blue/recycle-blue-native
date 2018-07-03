import React from 'react'
import { connect } from 'react-redux'
// import { Button } from 'react-native'
import RecycleMarker from './recycle-marker'
import AdMarker from './ad-marker'
import { getDistanceThunk } from '../../store/location'

class MarkerDetail extends React.Component {
  componentDidMount() {
    if (this.props.view === 'recycling') {
      const { userLocation, marker } = this.props
      const destination = `${marker.geometry.location.lat},${
        marker.geometry.location.lng
      }`
      const origin = `${userLocation.latitude},${userLocation.longitude}`
      this.props.getDistance(marker.id, origin, destination)
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.marker.id !== this.props.marker.id) {
      if (this.props.view === 'recycling') {
        const { userLocation, marker } = this.props
        const destination = `${marker.geometry.location.lat},${
          marker.geometry.location.lng
        }`
        const origin = `${userLocation.latitude},${userLocation.longitude}`
        this.props.getDistance(marker.id, origin, destination)
      }
    }
  }

  render() {
    const { marker, view } = this.props
    if (view === 'recycling') return <RecycleMarker marker={marker} />
    else return <AdMarker marker={marker} />
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
