import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import {
  Container,
  Tabs,
  Tab,
  ScrollableTab,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  Button,
} from 'native-base'
import { getUserActivitiesThunk } from '../store'
import { ProgressChart, ActivityChart, ActivityCard } from '.'

class Dashboard extends React.Component {
  // static navigationOptions = { drawerLabel: () => null }
  componentDidMount() {
    this.props.getUserActivitiesThunk(this.props.user.id)
  }

  render() {
    const { activities, user } = this.props
    return (
      <Container>
        <Card style={styles.card}>
          <CardItem>
            <Left>
              <Thumbnail
                name="userThunmbnail"
                large
                square
                source={{ uri: user.imageUrl }}
              />
              <Body>
                <Text>{user.name}</Text>
                <Text>{user.totalPoints}</Text>
              </Body>
            </Left>
            <Right>
              {user.milestone && (
                <Thumbnail
                  name="userMilestoneThumbnail"
                  large
                  square
                  source={{ uri: user.milestone.badgeIcon }}
                />
              )}
            </Right>
          </CardItem>
        </Card>
        <View style={styles.container}>
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="Progess">
              <ScrollView>
                <ProgressChart />
                <ActivityChart />
              </ScrollView>
            </Tab>
            <Tab heading="Activity">
              <Card style={{ maxHeight: 40 }}>
                <CardItem style={{ justifyContent: 'space-between' }}>
                  <Text style={{ paddingLeft: 10 }}>Img</Text>
                  <Text style={{ paddingLeft: 10 }}>Product Name</Text>
                  <Text>Points</Text>
                </CardItem>
              </Card>
              <ScrollView>
                {activities.length ? (
                  activities.map(activity => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      navigation={this.props.navigation}
                    />
                  ))
                ) : (
                    <Text> No Activity Yet! </Text>
                  )}
              </ScrollView>
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
    activities: state.userActivities,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserActivitiesThunk: userId => dispatch(getUserActivitiesThunk(userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
