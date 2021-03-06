import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text, Platform } from 'react-native'
import {
  Container,
  Tabs,
  Tab,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
} from 'native-base'
import { getUserActivitiesThunk } from '../../store'
import { ProgressChart, ActivityChart, ActivityCard } from '../'
import { ColorPalette, colors } from '../color-palette'

class Dashboard extends React.Component {
  // static navigationOptions = { drawerLabel: () => null }
  componentDidMount() {
    this.props.getUserActivitiesThunk(this.props.user.id)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.getUserActivitiesThunk(this.props.user.id)
    }
  }

  render() {
    const { activities, user } = this.props
    return (
      <Container style={ColorPalette.background}>
        <Card style={styles.card}>
          <CardItem style={{ justifyContent: 'space-between' }}>
            <Thumbnail
              name="userThunmbnail"
              large
              square
              source={{ uri: user.imageUrl }}
            />
            <View style={styles.body}>
              <Text style={styles.text}>{user.name}</Text>
              <Text >Points: {user.totalPoints}</Text>
            </View>
            {user.milestone && (
              <Thumbnail
                name="userMilestoneThumbnail"
                large
                square
                source={{ uri: user.milestone.badgeIcon }}
              />
            )}
          </CardItem>
        </Card>
        <View style={styles.container}>
          <Tabs
            tabBarUnderlineStyle={{ backgroundColor: colors.white }}
          >
            <Tab heading="Activity"
              tabStyle={{ backgroundColor: colors.main }}
              activeTabStyle={{ backgroundColor: colors.midLight }}
              textStyle={{ color: colors.white }}
              activeTextStyle={{ color: colors.white }}
            >
              <View style={styles.tabView}>
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
              </View>
            </Tab>
            <Tab heading="Progress"
              tabStyle={{ backgroundColor: colors.main }}
              activeTabStyle={{ backgroundColor: colors.midLight }}
              textStyle={{ color: colors.light }}
              activeTextStyle={{ color: colors.light }}

            >
              <ScrollView style={[styles.tabView, { paddingTop: 5 }]}>
                <ActivityChart currentUser={this.props.user.id} />
                <ProgressChart selectedUser={this.props.user} />
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
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    minHeight: 70,
    flex: 0.1,
    backgroundColor: colors.white,
  },
  tabView: {
    backgroundColor: colors.light,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 5,

  },
  body: {
    alignItems: 'center',
  }
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
