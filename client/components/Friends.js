import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import {
  getFriendsThunk,
  selectedFriendThunk,
  selectedFriendActivitiesThunk,
} from '../store'

class Friends extends React.Component {
  componentDidMount() {
    if (!this.props.friends.length) {
      this.props.getFriends(this.props.user.id)
    }
  }

  singleFriend = async friendId => {
    await this.props.selectFriend(this.props.user.id, friendId)
    await this.props.selectFriendActivities(this.props.user.id, friendId)
    this.props.navigation.navigate('dashboard')
  }

  render() {
    const { friends } = this.props
    return (
      <ScrollView>
        {friends.length ? (
          friends.map(friend => (
            <View key={friend.id}>
              <Image source={{ uri: friend.imageUrl }} style={styles.image} />
              <Text onPress={() => this.singleFriend(friend.id)}>
                {friend.name}
              </Text>
              <Text>{friend.totalPoints}</Text>
            </View>
          ))
        ) : (
          <Text> No response </Text>
        )}
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
    alignItems: 'center',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    friends: state.friends,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFriends: userId => dispatch(getFriendsThunk(userId)),
    selectFriend: (userId, friendId) =>
      dispatch(selectedFriendThunk(userId, friendId)),
    selectFriendActivities: (userId, friendId) =>
      dispatch(selectedFriendActivitiesThunk(userId, friendId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends)
