import React from 'react'
import { connect } from 'react-redux'
import { getUsersThunk } from '../store'
import { Image, ScrollView } from 'react-native'
import {
  Container,
  Content,
  Item,
  Icon,
  Input,
  Card,
  CardItem,
  Body,
  Left,
  Text,
} from 'native-base'

class SearchUsers extends React.Component {
  componentDidMount() {
    // load all users
    this.props.fetchUsers()
  }
  render() {
    const { users } = this.props
    return (
      <Container>
        <Content>
          <Item>
            <Input placeholder="Search For Other Users" />
            <Icon
              active
              name="search"
              onPress={() => console.log('PRESSED!')}
            />
          </Item>
          <ScrollView>
            {users.map(user => {
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
            })}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    users: state.userSearch.users,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(getUsersThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SearchUsers)
