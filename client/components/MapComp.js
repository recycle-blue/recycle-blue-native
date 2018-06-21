import React from 'react'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { getRecycleLocationsThunk } from '../store/location'

class MapComp extends React.Component {
  componentDidMount() {
    // fetch locations
    this.props.fetchRecycleLocations()
  }
  render() {
    console.log(this.props)
    const { recycleLocations } = this.props
    return (
      <MapView
        provider="google"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895766,
          longitude: -87.638865,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {recycleLocations.map(marker => {
          const location = {
            latitude: marker.geometry.location.lat,
            longitude: marker.geometry.location.lng,
          }
          return <MapView.Marker key={marker.id} coordinate={location} />
        })}
      </MapView>
    )
  }
}

const mapState = state => {
  return {
    recycleLocations: state.location,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchRecycleLocations: () => dispatch(getRecycleLocationsThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComp)
