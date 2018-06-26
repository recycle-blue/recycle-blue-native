import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardItem, Left, Right, Row } from 'native-base'

export default ActivityCard = (props) => {
  const { activity } = props
  return (
    <Card style={styles.card} key={activity.id}>
      <CardItem style={styles.cardItem} >
        <Thumbnail
          source={{ uri: activity.imageUrl }}
        />
        <Text>{activity.product.name}</Text>
        <Text>{activity.points}</Text>
      </CardItem>
    </Card>
  )
}

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
    flexDirection: 'row'
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
  item: {
    flex: 1,
    width: '100%',
  }
})
