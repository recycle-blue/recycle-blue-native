import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Container, Item, Icon, Input, Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import FriendCard from '../Dashboard/user-card'
import {
  getFriendsThunk,
  selectedFriendThunk,
  selectedFriendActivitiesThunk
} from '../../store'
import { colors } from '../color-palette'

class Friends extends React.Component {

  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.props.getFriends(this.props.user.id)
    this.setState({ isLoading: false })
  }

  singleFriend = async friendId => {
    await this.props.selectFriend(this.props.user.id, friendId)
    await this.props.selectFriendActivities(this.props.user.id, friendId)
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    const { user, friends, navigation, getFriends } = this.props
    if (this.state.isLoading) return <Spinner color="blue" />
    return (
      <Container>
        <Item>
            <Input
              placeholder="Search"
              onChangeText={text => getFriends(user.id, text)}
            />
            <Icon active name="search" />
          </Item>
        <ScrollView >
            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between' }}>
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
                <Text> No Result </Text>
              )}
            </View>
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 100,
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
    getFriends: (userId, text) => dispatch(getFriendsThunk(userId, text)),
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
