import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import { ProgressChart, ActivityChart } from '.'

class Dashboard extends React.Component {


  render() {
    const { user } = this.props
    return (
      <Container>
        <View style={styles.container}>
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.image}
          />
          <Text>{user.name}</Text>
          <Text>{user.totalPoints}</Text>
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading='Progess'>
              <ScrollView>
                <ProgressChart />
                <ActivityChart />
              </ScrollView>
            </Tab>
            <Tab heading='Activity'>
              <ScrollView>
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
  }
})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
