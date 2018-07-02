import React from 'react'
import { StyleSheet, Image, Text, View, Button } from 'react-native'
import { Container, Form, Item, Input, Content } from 'native-base'
import { connect } from 'react-redux'
import { colors } from './color-palette'

const mapStateToProps = store => ({
  loading: '/recycleloading.gif',
})

class LoadingScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null,
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Image
            style={styles.image}
            source={require('../recycleloading.gif')}
          />
          <Text>Loading</Text>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  image: {
    flex: 1,
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default connect(mapStateToProps)(LoadingScreen)
