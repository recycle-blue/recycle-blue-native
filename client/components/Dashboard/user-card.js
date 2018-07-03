import React from 'react'
import { connect } from 'react-redux'
import { getUserThunk, addFriendThunk } from '../../store'
import {
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  Button,
  Right,
} from 'native-base'
import { Image, TouchableOpacity, View, Text } from 'react-native'

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
      <TouchableOpacity
        onPress={() => {
          this.props.selectUser(user.id)
          navigate('FriendDashboard')
        }}
        style={{width: '49%'}}
      >
        <Card key={user.id}>
          <CardItem>
            <Thumbnail source={{ uri: user.imageUrl }} large />
            <View style={{width: '50%'}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{user.firstName}</Text>
              <Text style={{textAlign: 'center', fontWeight: 'bold',paddingBottom: 5}}>{user.lastName} </Text>
              <Text note style={{textAlign: 'center'}}>{user.totalPoints}</Text>
           </View>
            {!friends &&
            !this.state.isFriendOfUser && (user.id !== this.props.currentUser.id) && (
            <Button
            success
            onPress={() => this.addFriend(currentUser.id, user.id)}
            >
            <Text> Add Friend </Text>
            </Button>
            )}
          </CardItem>
        </Card>
      </TouchableOpacity>
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
