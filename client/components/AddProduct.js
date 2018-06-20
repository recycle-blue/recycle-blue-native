import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class AddProduct extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Product Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
