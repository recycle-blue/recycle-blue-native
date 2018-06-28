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
  const { user } = props
  if (!user.id) return <Text>LOADING...</Text>
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
          <Title>Dashboard</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Dashboard user={user} navigation={props.navigation} />
      </Content>
    </Container>
  )
}

const mapState = state => {
  return {
    user: state.userSearch.selectedUser,
  }
}

export default connect(mapState)(FriendDashboard)
