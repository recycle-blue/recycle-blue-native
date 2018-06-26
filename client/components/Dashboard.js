import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import {
  Container, Tabs, Tab, ScrollableTab,
  Card, CardItem, Body, Left, Right, Thumbnail
} from 'native-base'
import { getUserActivitiesThunk, setSelectedFriend } from '../store'
import { UserActivities, ProgressChart, ActivityChart } from '.'

class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.selectedFriend.id) {
      this.props.getUserActivitiesThunk(this.props.user.id)
    }
  }

  componentWillUnmount() {
    this.props.removeSelectedFriend()
  }

  render() {
    const user = this.props.selectedFriend.id ? this.props.selectedFriend : this.props.user
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
              <UserActivities />
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
    user: state.user,
    selectedFriend: state.selectedFriend
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    getUserActivitiesThunk: (userId) => dispatch(getUserActivitiesThunk(userId)),
    removeSelectedFriend: () => dispatch(setSelectedFriend({}))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
