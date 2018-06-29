import React from 'react'
import { StyleSheet, ScrollView} from 'react-native'
import {Container, Item, Icon, Input, Text, Spinner} from 'native-base'
import { connect } from 'react-redux'
import FriendCard from './user-card'
import {
  getFriendsThunk,
  selectedFriendThunk,
  selectedFriendActivitiesThunk
} from '../store'

class Friends extends React.Component {

  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.props.getFriends(this.props.user.id)
    this.setState({isLoading: false})
  }

  singleFriend = async friendId => {
    await this.props.selectFriend(this.props.user.id, friendId)
    await this.props.selectFriendActivities(this.props.user.id, friendId)
    this.props.navigation.navigate('dashboard')
  }

  render() {
    const {user, friends, navigation, getFriends } = this.props
    if(this.state.isLoading) return <Spinner color="blue" />
    return (
      <Container>
        <ScrollView stickyHeaderIndices={[0]}>
          <Item>
            <Input
              placeholder="Search"
              onChangeText={text => getFriends(user.id,text)}
            />
            <Icon active name="search" />
          </Item>
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
            <View> No Result </View>
          )}
        </ScrollView>
      </Container>
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
    getFriends: (userId,text) => dispatch(getFriendsThunk(userId,text)),
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
