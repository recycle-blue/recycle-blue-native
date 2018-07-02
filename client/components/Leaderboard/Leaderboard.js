import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import { getLeadersThunk } from '../../store'
import { colors } from '../color-palette'

class Leaderboard extends React.Component {

  componentDidMount() {
    this.props.getLeaderboard(this.props.user.id)
  }

  render() {
    const { leaders } = this.props
    return (
      <ScrollView>
        {leaders.length ?
          leaders.map(leader =>
            <View key={leader.id}>
              <Image
                source={{ uri: leader.imageUrl }}
                style={styles.image}
              />
              <Text>{leader.name}</Text>
              <Text>{leader.totalPoints}</Text>
            </View>
          )
          : <Text style={{ textAlign: 'center' }}> No response </Text>}
      </ScrollView>
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
    getLeaderboard: (userId) => dispatch(getLeadersThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
