import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import { Container, Tabs,Tab, ScrollableTab } from 'native-base';
import { getFriendsThunk } from '../store'

class Friends extends React.Component {

    componentDidMount() {
      this.props.getFriends(this.props.user.id)
    }

    render(){
      const {friends} = this.props
      return (
        <ScrollView>
          {friends.length ?
            friends.map(friend =>
              <View key={friend.id}>
                <Image
                  source={{uri: friend.imageUrl}}
                  style={styles.image}
                />
                <Text>{friend.name}</Text>
                <Text>{friend.totalPoints}</Text>
              </View>
            )
            : <Text> No response </Text>}
        </ScrollView>
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
  image: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    user: state.user,
    friends: state.friends
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFriends: (userId) => dispatch(getFriendsThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)