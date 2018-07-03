import React from 'react'
import { connect } from 'react-redux'
import { Dashboard } from '../'
import { StyleSheet } from 'react-native'
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
import { colors, StatusBarHeight } from '../color-palette'

const FriendDashboard = props => {
  const { user } = props
  if (!user.id) return <Text>LOADING...</Text>
  return (
    <Container>
      <Header style={styles.header} >
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('Friends')}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: colors.white }}>Dashboard</Title>
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.main,
    paddingTop: StatusBarHeight(),
    height: 45 + StatusBarHeight(),
  },
})

export default connect(mapState)(FriendDashboard)
