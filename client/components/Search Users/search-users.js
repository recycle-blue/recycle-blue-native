import React from 'react'
import { connect } from 'react-redux'
import { getUsersThunk, getFriendsHashThunk } from '../../store'
import { ScrollView } from 'react-native'
import UserCard from '../Dashboard/user-card'
import {
  Container,
  Content,
  Item,
  Icon,
  Input,
  Text,
  Spinner,
} from 'native-base'

class SearchUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.props.fetchUsers()
    await this.props.getFriends(this.props.user.id)
    this.setState({ isLoading: false })
  }

  handleSearch = (text) => {
    this.props.fetchUsers(text)
  }

  render() {
    if (this.state.isLoading) return <Spinner color="blue" />
    const { users } = this.props
    return (
      <Container>
        <Content>
          <ScrollView stickyHeaderIndices={[1]}>
            <Item>
              <Input
                placeholder="Search"
                onChangeText={ (text) => this.handleSearch(text)}
              />
              <Icon active name="search" />
            </Item>
            {/* {results} */}
            { users.length ? users.map( user => {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    navigate={this.props.navigation.navigate}
                  />
            )}) : <Text> No Result </Text>}
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
    fetchUsers: (text) => dispatch(getUsersThunk(text)),
    getFriends: userId => dispatch(getFriendsHashThunk(userId)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SearchUsers)
