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
  constructor() {
    super()
    this.state = {
      text: '',
    }
  }
  componentDidMount() {
    this.props.fetchUsers()
  }
  handleChange = text => {
    this.setState({ text })
  }
  filterResults(users, text) {
    // filter based on state the users array
    return users.filter(user => {
      return user.name.search(text) > -1
    })
  }
  render() {
    const { users } = this.props
    const { text } = this.state
    const filteredUsers = this.filterResults(users, text)
    return (
      <Container>
        <Content>
          <Item>
            <Input
              placeholder="Search For Other Users"
              onChangeText={this.handleChange}
            />
            <Icon active name="search" />
          </Item>
          <ScrollView>
            {filteredUsers.map(user => {
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
