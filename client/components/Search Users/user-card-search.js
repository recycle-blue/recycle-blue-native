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
import {colors} from '../color-palette'

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
            <TouchableOpacity
              style={{flexDirection: 'row', flex: 4, alignItems: 'center', paddingRight: 25}}
              onPress={() => {
                this.props.selectUser(user.id)
                navigate('FriendDashboard')
              }}
            >
              <Thumbnail source={{ uri: user.imageUrl }} large />
              <View style={{flex: 2, alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{user.firstName}</Text>
                <Text style={{textAlign: 'center', fontWeight: 'bold',paddingBottom: 5}}>{user.lastName}</Text>
              </View>
                <Text note style={{textAlign: 'center'}}>{user.totalPoints}</Text>
            </TouchableOpacity>
            <View style={{flex: 1, justifyContent: 'center'}}>
            {!friends &&
              !this.state.isFriendOfUser && (user.id !== this.props.currentUser.id) && (
                <TouchableOpacity
                  style={{ justifyContent: 'center'}}
                  onPress={() => this.addFriend(currentUser.id, user.id)}
                >
                  <Text style={{fontSize: 35, textAlign: 'center', fontWeight: 'bold', color: colors.midDark}}> + </Text>
                </TouchableOpacity>
              )}
            </View>
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
