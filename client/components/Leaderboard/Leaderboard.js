import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { Container, Card, CardItem, Title, Header, Left, Right, Icon, Thumbnail } from 'native-base';
import { getLeadersThunk, getUserThunk } from '../../store'
import { colors } from '../color-palette'

class Leaderboard extends React.Component {

  componentDidMount() {
    this.props.getLeaderboard(this.props.user.id)
  }

  handlePress = async (userId) => {
      await this.props.selectUser(userId)
      this.props.navigation.navigate('FriendDashboard')
  }

  render() {
    const { leaders } = this.props
    return (
      <Container>
        <Header>
          <Title style={{ color: 'blue', fontSize: 30 }}>
            Leaderboard
          </Title>
        </Header>
        <ScrollView>
          {leaders.length ?
            leaders.map( (leader, idx) =>
              <Card key={leader.id} >
                <CardItem button onPress={() => this.handlePress(leader.id)}>
                  <Left>
                    <Text>{idx + 1}</Text>
                  </Left>
                  <Left>
                    <Text>{leader.name}</Text>
                  </Left>
                  <Right>
                  {leader.milestone && (
                    <Thumbnail
                      name="userMilestoneThumbnail"
                      small
                      square
                      source={{ uri: leader.milestone.badgeIcon }}
                    />
                  )}
                    {/* <Icon name='star' style={{color: 'gold'}} /> */}
                    <Text>{leader.totalPoints}</Text>
                  </Right>
                </CardItem>
              </Card>
            )
            : <Text style={{ textAlign: 'center' }}> No response </Text>}
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    user: state.user,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLeaderboard: (userId) => dispatch(getLeadersThunk(userId)),
    selectUser: userId => dispatch(getUserThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
