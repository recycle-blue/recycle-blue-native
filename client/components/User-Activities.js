import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'

const UserActivities = (props) => {
    const {activities} = props
    return (
        <ScrollView>
          {activities.length ?
            activities.map(activity =>
              <View key={activity.id}>
                <Image
                  source={{uri: activity.imageUrl}}
                  style={styles.image}
                />
                <Text>{activity.product.name}</Text>
                <Text>{activity.points}</Text>
              </View>
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
  }
})

const mapStateToProps = state => {
  return {
    activities: state.userActivities
  }
}

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }

export default connect(mapStateToProps)(UserActivities)
