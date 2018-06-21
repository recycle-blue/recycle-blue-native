import React from 'react'
import { MapView } from 'expo'
import axios from 'axios'
import { googleAPIKey } from '../secrets'

class MapComp extends React.Component {
  constructor() {
    super()
    this.state = {
      markers: [],
    }
  }
  async componentDidMount() {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.895766,-87.638865&keyword=recycle&radius=3000&key=${googleAPIKey}`
    )
    console.log('RESULTS:', data.results[0].geometry.location)
    this.setState({ markers: data.results })
  }
  render() {
    const { markers } = this.state
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
        {markers.map(marker => {
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

export default MapComp
