import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share'
import {connect} from 'react-redux'
import { Icon } from 'native-base'
// import { shareOnFacebook, shareOnTwitter} from 'react-native-social-share'

class SocialMedia extends React.Component {

  render() {

    let shareImageBase64 = {
      title: "React Native",
      message: ``,
     // url: REACT_ICON, // This will have the activity imageUrl once its passed as props
      subject: "Share Link", //  for email
      failOnCancel: false
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          Share.open(shareImageBase64)
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
