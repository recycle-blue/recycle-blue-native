import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardItem, Left, Right, Row, Thumbnail } from 'native-base'
import { setActivity } from '../store'

class ActivityCard extends React.Component {
  constructor(props) {
    super(props)
  }
  handlePress = async () => {
    if (!this.props.disabled) {
      await this.props.selectActivity(this.props.activity)
      console.log('props', this.props)
      this.props.navigation.navigate('activity')
    }
  }
  render() {
    const { activity } = this.props
    return (
      <Card style={styles.card}>
        <CardItem button style={styles.cardItem} onPress={this.handlePress} >
          <Thumbnail medium square
            source={{ uri: activity.imageUrl }}
          />
          <Text style={styles.name} >{activity.product.name}</Text>
          <Text style={styles.points} >{activity.points}</Text>
        </CardItem>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectActivity: (activity) => dispatch(setActivity(activity))
})

const styles = StyleSheet.create({
  card: {
    // maxHeight: 70,
    // flex: 0.1,
  },
  cardItem: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    flex: 0.5,
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
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

export default connect(null, mapDispatchToProps)(ActivityCard)