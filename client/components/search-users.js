import React from 'react'
import { Container, Content, Item, Icon, Input } from 'native-base'

class SearchUsers extends React.Component {
  componentDidMount() {
    // load all users or something
  }
  render() {
    return (
      <Container>
        <Content>
          <Item>
            <Input placeholder="Search For Other Users" />
            <Icon active name="search" />
          </Item>
        </Content>
      </Container>
    )
  }
}

export default SearchUsers
