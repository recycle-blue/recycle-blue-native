import React from 'react'
import { Form, Picker, Icon, Container } from 'native-base'
import MapComp from './MapComp'

class MapWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      view: 'recycle',
    }
  }

  handleChange = value => {
    this.setState({ view: value })
  }
  render() {
    return (
      <Container>
        <Form>
          <Picker
            mode="dropdown"
            iosHeader="What do you want to see?"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            style={{ width: undefined }}
            onValueChange={this.handleChange}
            placeholder="What do you want to see?"
            selectedValue={this.state.selected}
          >
            <Picker.Item label="Recycling Locations" value="recycling" />
            <Picker.Item label="Ads" value="ads" />
          </Picker>
        </Form>
        <MapComp view={this.state.view} />
      </Container>
    )
  }
}

export default MapWrapper
