import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardItem, Left, Right, Row } from 'native-base'

const UserActivities = (props) => {
  const { activities } = props
  return (
    <ScrollView>
      {activities.length ?
        activities.map(activity =>
          <Card style={styles.card} key={activity.id}>
            <CardItem>
              <Left>
                <Image
                  source={{ uri: activity.imageUrl }}
                  style={styles.image}
                />
              </Left>
              <Right style={styles.right}>
                <Text>{activity.product.name}</Text>
                <Text>{activity.points}</Text>
              </Right>
            </CardItem>
          </Card>
        )
        : <Text> No Activity </Text>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  card: {
    minHeight: 70,
    flex: 0.1,
  },
  right: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
})

const mapStateToProps = state => {
  return {
    activities: state.userActivities
  }
}

export default connect(mapStateToProps)(UserActivities)
