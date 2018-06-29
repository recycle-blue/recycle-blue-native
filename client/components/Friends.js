import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import FriendCard from './user-card'
import {
  getFriendsThunk,
  selectedFriendThunk,
  selectedFriendActivitiesThunk,
} from '../store'

class Friends extends React.Component {
  componentDidMount() {
    this.props.getFriends(this.props.user.id)
  }

  singleFriend = async friendId => {
    await this.props.selectFriend(this.props.user.id, friendId)
    await this.props.selectFriendActivities(this.props.user.id, friendId)
    this.props.navigation.navigate('dashboard')
  }

  render() {
    const { friends, navigation } = this.props
    return (
      <ScrollView>
        {friends.length ? (
          friends.map(friend => {
            return (
              <FriendCard
                key={friend.id}
                user={friend}
                navigate={navigation.navigate}
                friends={true}
              />
            )
          })
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
