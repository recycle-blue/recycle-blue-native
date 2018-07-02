import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base'
import moment from 'moment'
export default class CommentCard extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }
  render() {
    const imageurl = 'https://i.imgur.com/lsoomRq.jpg'
    return (
      <View>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: `${this.props.comment.user.imageUrl}` }} />
                <Body>
                  <Text>{this.props.comment.user.name}</Text>
                  <Text note>{moment(this.props.comment.createdAt).format('"dddd, MMMM Do YYYY, h:mm:ss a"')}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {this.props.comment.text}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </View>

    )
  }
}

