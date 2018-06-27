import React from 'react'
import { connect } from 'react-redux'
import { selectUserAction } from '../store'
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

const UserCard = props => {
  const { user, navigate } = props
  return (
    <Card key={user.id}>
      <CardItem onPress={() => console.log('pressed!')}>
        <Left>
          <Thumbnail source={{ uri: user.milestone.badgeIcon }} small />
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
                props.selectUser(user.id)
                props.navigate('dashboard')
              }}
            >
              <Text> View Dashboard </Text>
            </Button>
          </Body>
        </Left>
      </CardItem>
    </Card>
  )
}

const mapDispatch = dispatch => {
  return {
    selectUser: userId => dispatch(selectUserAction(userId)),
  }
}

export default connect(
  null,
  mapDispatch
)(UserCard)
