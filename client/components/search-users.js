import React from 'react'
import { connect } from 'react-redux'
import { getUsersThunk, getFriendsHashThunk } from '../store'
import { ScrollView } from 'react-native'
import UserCard from './user-card'
import { Container, Content, Item, Icon, Input, Text } from 'native-base'

class SearchUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
    }
  }

  async componentDidMount() {
    await this.props.fetchUsers()
    await this.props.getFriends(this.props.user.id)
  }

  handleChange = text => {
    this.setState({ text })
  }

  filterResults(users, text) {
    // filter based on state the users array
    return users.filter(user => {
      return user.name.toLowerCase().search(text.toLowerCase().trim()) > -1
    })
  }

  resultsFound(filteredUsers) {
    if (filteredUsers.length) {
      return filteredUsers.map(user => {
        return (
          <UserCard
            key={user.id}
            user={user}
            navigate={this.props.navigation.navigate}
          />
        )
      })
    } else {
      return <Text>No results found</Text>
    }
  }

  render() {
    const { users } = this.props
    const { text } = this.state
    const filteredUsers = this.filterResults(users, text)
    const results = this.resultsFound(filteredUsers)
    return (
      <Container>
        <Content>
          <ScrollView stickyHeaderIndices={[1]}>
            <Item>
              <Input
                placeholder="Search For Other Users"
                onChangeText={this.handleChange}
              />
              <Icon active name="search" />
            </Item>
            {results}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    users: state.userSearch.users,
    user: state.user,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(getUsersThunk()),
    getFriends: userId => dispatch(getFriendsHashThunk(userId)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SearchUsers)
