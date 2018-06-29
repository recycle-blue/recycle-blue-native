import React from 'react'
import { StyleSheet, Share, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Icon } from 'native-base'

class ContactEmail extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  }
  render() {
    const activity = this.props.activity;
    console.log("what is this activity?", activity)
    let shareMessage = {
      to: "lams101@gmail.com",
      title: "",
      message: `I woudld like to pick up  ${activity.category.name} ${activity.product.name}. #RecycleBlue`,
      subject: `I am Interested in the ${activity.category.name}`, //  for email
      failOnCancel: false
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          Share.share(shareMessage)
            .then((res) => console.log(res))
            .catch((err) => {
              if (err) {
                return
              }
            })
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

export default connect(null)(ContactEmail)
