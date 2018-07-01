import React from 'react'
import { connect } from 'react-redux'
import { Form, Picker, Icon, Container, Spinner } from 'native-base'
import MapComp from './MapComp'
import { setFetch } from '../store/location'

class MapWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      view: 'recycling',
    }
  }

  handleChange = value => {
    this.props.setFetch(true)
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
            selectedValue={this.state.view}
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

const mapState = state => {
  return {
    isFetching: state.location.isFetching,
  }
}
const mapDispatch = dispatch => {
  return {
    setFetch: status => dispatch(setFetch(status)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapWrapper)