import React from 'react'
import { getFeedThunk } from '../../store'
import { connect } from 'react-redux'
import { ScrollView, Text } from 'react-native'
import { FeedCard } from '../'
import { Container, Header, Content } from 'native-base'

class Feed extends React.Component {

  componentDidMount() {
    this.props.getFeed(this.props.user.id)
  }

  render() {
    const activities = this.props.feed
    return (
      <Container>
        <Header />
        <Content>
          <ScrollView>
            {activities.length ? (
              activities.map(activity => (
                <FeedCard
                  key={activity.id}
                  activity={activity}
                  navigation={this.props.navigation}
                />
              ))
            ) : (
                <Text style={{ textAlign: 'center' }}> No Activity Yet! </Text>
              )}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    feed: state.feed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFeed: (userId) => dispatch(getFeedThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
