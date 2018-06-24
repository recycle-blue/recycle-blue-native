import React from 'react'
import { StyleSheet, Image, Text, View, Button } from 'react-native'
import { Container, Form, Item, Input, Content } from 'native-base'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  loading: '/recycle-loading.gif'
})

const LoadingScreen = (props) => {
  return (
    <Container>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }, image: {
    flex: 1,
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default connect(mapStateToProps)(LoadingScreen)

