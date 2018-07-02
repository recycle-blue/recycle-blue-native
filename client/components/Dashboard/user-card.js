import React from 'react'
import { connect } from 'react-redux'
import { getUserThunk, addFriendThunk } from '../../store'
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail,
  Button,
  Right,
} from 'native-base'
import { Image } from 'react-native'

class UserCard extends React.Component {
  constructor() {
    super()
    this.state = {
      isFriendOfUser: null,
    }
  }

  componentDidMount() {
    this.checkIfFriend()
  }

  checkIfFriend() {
    const { user, friendsObj } = this.props
    if (friendsObj[user.id]) return this.setState({ isFriendOfUser: true })
    this.setState({ isFriendOfUser: false })
  }

  addFriend = async (currentUserId, selectedUserId) => {
    await this.props.addFriend(currentUserId, selectedUserId)
    this.setState({ isFriendOfUser: true })
  }

  render() {
    const { user, navigate, currentUser, friends } = this.props
    return (
      <Card key={user.id}>
        <CardItem>
          <Left>
            {user.milestone && (
              <Thumbnail source={{ uri: user.milestone.badgeIcon }} small />
            )}
            <Body>
              <Text>{user.name}</Text>
              <Text note>{user.totalPoints}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Left />
          <Thumbnail source={{ uri: user.imageUrl }} large />
          <Right />
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <Button
                primary
                onPress={() => {
                  this.props.selectUser(user.id)
                  navigate('FriendDashboard')
                }}
              >
                <Text> View Dashboard </Text>
              </Button>
            </Body>
          </Left>
          <Right>
            {!friends &&
              !this.state.isFriendOfUser && (user.id !== this.props.currentUser.id) &&(
                <Button
                  success
                  onPress={() => this.addFriend(currentUser.id, user.id)}
                >
                  <Text> Add Friend </Text>
                </Button>
              )}
          </Right>
        </CardItem>
      </Card>
    )
  }
}

const mapState = state => {
  return {
    friendsObj: state.userSearch.friends,
    currentUser: state.user,
  }
}
const mapDispatch = dispatch => {
  return {
    selectUser: userId => dispatch(getUserThunk(userId)),
    addFriend: (currentUserId, selectedUserId) =>
      dispatch(addFriendThunk(currentUserId, selectedUserId)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserCard)
