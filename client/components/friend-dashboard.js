import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { View } from 'react-native'
import {
  Button,
  Text,
  Container,
  Header,
  Body,
  Left,
  Right,
  Title,
  Content,
  Icon,
} from 'native-base'

const FriendDashboard = props => {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('friends')}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Friend Dashboard</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>Stuff will go here</Text>
      </Content>
    </Container>
  )
}

export default FriendDashboard
