import React from 'react'
import { connect } from 'react-redux'
import {
  Container, Tabs, Tab, ScrollableTab,
  Card, CardItem, Text, Body, Left, Right, Thumbnail
} from 'native-base'
import { ProgressChart, ActivityChart } from '.'
import { StyleSheet, Text, View, Image } from 'react-native'
import {getUserActivitiesThunk} from '../store'
import { UserActivities } from './'

class Dashboard extends React.Component {
  componentDidMount(){
    this.props.getUserActivitiesThunk(this.props.user.id);
  }

  render() {
    const { user } = this.props
    console.log("what do i have on user ", user)
    return (
      <Container >
        <Card style={styles.card}>
          <CardItem>
            <Left>
              <Thumbnail name="userThunmbnail" large square source={{ uri: user.imageUrl }} />
              <Body>
                <Text>{user.name}</Text>
                <Text>{user.totalPoints}</Text>
              </Body>
            </Left>
            <Right>
              <Thumbnail name="userMilestoneThumbnail" large square source={{ uri: user.milestone.badgeIcon }} />
            </Right>
          </CardItem>
        </Card>
        <View style={styles.container}>
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading='Progess'>
              <ScrollView>
                <ProgressChart />
                <ActivityChart />
              </ScrollView>
            </Tab>
            <Tab heading='Activity'>
<<<<<<< HEAD
              <ScrollView>
              </ScrollView>
=======
             <UserActivities />
>>>>>>> 5f3c7233324c32e250de2249bdb786e979336d0e
            </Tab>
          </Tabs>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 0.5,
    width: 350,
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    minHeight: 70,
    flex: 0.1,
  },

})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserActivitiesThunk: (userId) => dispatch(getUserActivitiesThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
