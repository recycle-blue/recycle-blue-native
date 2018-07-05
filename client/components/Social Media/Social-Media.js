import React from 'react'
import { StyleSheet, Text, Share, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

class SocialMedia extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  }
  render() {
    const activity = this.props.activity
    let shareImageBase64 = {
      title: "React Native",
      message: `I just recycled ${activity.quantity} units of ${activity.category.name} ${activity.product.name}. ${activity.category.description} #RecycleBlue`,
      subject: "Share Link", //  for email
      failOnCancel: false
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            Share.share(shareImageBase64)
              .then((res) => console.log(res))
              .catch((err) => {
                if (err) {
                  console.error(err)
                }
              })
          }}>
          <Icon name='share' style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  instructions: {
    marginTop: 20,
    marginBottom: 20,
  },
})

export default connect(null)(SocialMedia)
