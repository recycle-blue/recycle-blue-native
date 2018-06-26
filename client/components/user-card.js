import React from 'react'
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

export default UserCard
