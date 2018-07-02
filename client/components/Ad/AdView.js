import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { getAdThunk } from '../../store'

class AdView extends React.Component {
  componentWillMount() {
    this.props.getAd(this.props.activityId)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text>Address: {this.props.address}</Text>
          <View style={styles.sideBySide}>
            <Text style={styles.city}>City: {this.props.city}</Text>
            <Text style={styles.state}>State: {this.props.state}</Text>
            <Text style={styles.zipCode}>Zip Code: {this.props.zipCode}</Text>
          </View>
          <Text>Email: {this.props.email}</Text>
          <Text>Description: {this.props.description}</Text>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: '100%',
  },
  sideBySide: {
    flexDirection: 'row',
  },
  city: {
    flex: 5,
  },
  state: {
    flex: 3,
  },
  zipCode: {
    flex: 4,
  }
})

const mapStateToProps = state => {
  return ({
    address: state.ad.address,
    city: state.ad.city,
    state: state.ad.state,
    zipCode: state.ad.zipCode,
    email: state.ad.email,
    description: state.ad.description,
    activityId: state.activity.id
  })
}

const mapDispatchToProps = dispacth => {
  return ({
    getAd: (activityId) => dispacth(getAdThunk(activityId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdView)
