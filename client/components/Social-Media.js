import React from 'react'
import { StyleSheet, Text, Share, TouchableOpacity, View } from 'react-native';
// import Share from 'react-native-share'
import {connect} from 'react-redux'
import { Icon } from 'native-base'
window.btoa = require('Base64').btoa;

class SocialMedia extends React.Component {

  render() {
    const activity = this.props.activity;
    let shareImageBase64 = {
      title: "React Native",
      message: `I just recycled ${activity.quantity} units of ${activity.category.name} ${activity.product.name}. ${activity.product.description} #RecycleBlue`,
      subject: "Share Link", //  for email
      failOnCancel: false
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          Share.share(shareImageBase64)
          .then((res) => console.log(res))
          .catch((err) => {
            if(err) {
              return
            }})
        }}>
          <View style={styles.instructions}>
            <Icon name='share' />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default connect(null)(SocialMedia)
