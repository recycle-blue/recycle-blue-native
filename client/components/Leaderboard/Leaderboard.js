import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Card, CardItem, Thumbnail } from 'native-base'
import { getLeadersThunk, getUserThunk } from '../../store'
import { colors, StatusBarHeight } from '../color-palette'

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
      <Container style={{ backgroundColor: colors.light }} >
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Leaderboard
          </Text>
        </View>
        <Card style={[styles.card, { maxHeight: 40 }]} >
          <CardItem style={styles.cardItem}          >
            <Text style={styles.idxTop}>#</Text>
            <Text style={styles.numTop} />
            <Text style={styles.nameTop}>User</Text>
            <Text style={styles.numTop}>Pts</Text>
            <Text style={styles.imageTop}>Rank</Text>
          </CardItem>
        </Card>
        <ScrollView>
          {leaders.length ?
            leaders.map((leader, idx) =>
              <Card key={leader.id} style={styles.card} >
                <CardItem
                  button
                  onPress={() => this.handlePress(leader.id)}
                  style={styles.cardItem}
                >
                  <Text style={styles.idx}>{idx + 1}</Text>
                  <Thumbnail
                    name="userPicThumbnail"
                    small
                    source={{ uri: leader.imageUrl }}
                    style={styles.image}
                  />
                  <Text style={styles.name}>{leader.name}</Text>
                  <Text style={styles.num}>{leader.totalPoints}</Text>
                  {leader.milestone && (
                    <Thumbnail
                      name="userMilestoneThumbnail"
                      small
                      square
                      source={{ uri: leader.milestone.badgeIcon }}
                      style={styles.image}
                    />
                  )}
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
  card: {
    marginBottom: 3,
    marginTop: 2,
  },
  cardItem: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: colors.midLight,
    height: 30,
    width: '80%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    marginBottom: 5,
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    flex: 1
  },
  num: {
    flex: 1,
    textAlign: 'center',
  },
  idx: {
    width: 15
  },
  name: {
    flex: 3,
    textAlign: 'center',
  },
  imageTop: {
    flex: 1,
    textAlign: 'center'
  },
  numTop: {
    flex: 1,
    textAlign: 'center'
  },
  idxTop: {
    width: 15,
    textAlign: 'center'
  },
  nameTop: {
    flex: 3,
    textAlign: 'center',
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
