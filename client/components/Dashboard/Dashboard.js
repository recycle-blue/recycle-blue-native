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

  render() {
    const { activities, user } = this.props
    return (
      <Container style={ColorPalette.background}>
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
          <Tabs
            tabBarUnderlineStyle={{ backgroundColor: colors.light }}
          >
            <Tab heading="Activity"
              tabStyle={{ backgroundColor: colors.main }}
              activeTabStyle={{ backgroundColor: colors.midDark }}
              textStyle={{ color: colors.light }}
              activeTextStyle={{ color: colors.light }}
            >
              <View style={styles.tabView}>
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
              </View>
            </Tab>
            <Tab heading="Progess"
              tabStyle={{ backgroundColor: colors.main }}
              activeTabStyle={{ backgroundColor: colors.midDark }}
              textStyle={{ color: colors.light }}
              activeTextStyle={{ color: colors.light }}

            >
              <ScrollView style={[styles.tabView, { paddingTop: 5 }]}>
                <ProgressChart />
                <ActivityChart />
                <ProgressChart />
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
