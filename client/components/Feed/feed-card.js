import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardItem, Left, Right, Row, Thumbnail } from 'native-base'
import { setActivity } from '../../store'
import { colors } from '../color-palette'

class FeedCard extends React.Component {
  constructor(props) {
    super(props)
  }
  handlePress = async () => {
    if (!this.props.disabled) {
      await this.props.selectActivity(this.props.activity)
      this.props.navigation.navigate('Activity')
    }
  }
  render() {
    const { activity } = this.props
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: activity.user.imageUrl}} />
            <Body>
              <Text>{activity.user.name}</Text>
              <Text note>{activity.createdAt}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: activity.imageUrl}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        {/* <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem> */}
      </Card>
      // <Card style={styles.card}>
      //   <CardItem button style={styles.cardItem} onPress={this.handlePress} >
      //     <Thumbnail medium square
      //       source={{ uri: activity.user.imageUrl }}
      //     />
      //     <Text style={styles.name} >{activity.user.name}</Text>
      //   </CardItem>
      //   <CardItem button style={styles.cardItem} onPress={this.handlePress} >
      //     <Thumbnail medium square
      //       source={{ uri: activity.imageUrl }}
      //     />
      //     <Text style={styles.name} >{activity.category.name + ' ' + activity.product.name}</Text>
      //     <Text style={styles.points} >{activity.points}</Text>
      //   </CardItem>
      // </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectActivity: (activity) => dispatch(setActivity(activity))
})

const styles = StyleSheet.create({
  card: {
    maxHeight: 160,
    // flex: 0.1,
  },
  cardItem: {
    // flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    flex: 0.5,
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 4,
    width: '100%',
    textAlign: 'center',
  },
  points: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
  },
})

export default connect(null, mapDispatchToProps)(FeedCard)
