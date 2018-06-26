import React from 'react'
import { connect } from 'react-redux'
import { Card, CardItem, Body, Text, Left } from 'native-base'
import { Image } from 'react-native'

const UserCard = props => {
  const { user } = props
  return (
    <Card key={user.id}>
      <CardItem>
        <Left>
          <Body>
            <Text>{user.name}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: user.imageUrl }}
          style={{ height: 200, width: 200, flex: 1 }}
        />
      </CardItem>
    </Card>
  )
}

const mapDispatch = dispatch => {
  return {
    selectUser: userId => dispatch(selectUserThunk(userId)),
  }
}

export default connect(
  null,
  mapDispatch
)(UserCard)
