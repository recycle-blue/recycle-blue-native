import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import store from './store'
import { Navigation } from './navigation'
import { Font } from 'expo'
import { LoadingPage } from './components'
import { colors } from './components/color-palette'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { loading: true }
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading: false })
  }
  render() {
    if (this.state.loading) {
      return (
        <View />
      )
    } else {
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
