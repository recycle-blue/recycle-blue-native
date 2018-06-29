import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text, Platform } from 'react-native'
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
  Form,
  Item,
  Input,
  Picker,
} from 'native-base'
import { getMarketplaceAdsThunk } from '../store'
import { ActivityCard } from '.'

class Marketplace extends React.Component {
  componentDidMount() {
    this.props.getMarketplaceAdsThunk()
  }

  render() {
    const { marketplace } = this.props
    return (
      <Container>
        <View name='StaticFrame' style={styles.container}>
          {/* <Form> */}
          <Item>
            <Picker
              name="category"
              style={Platform.OS === 'ios' ? styles.ios : styles.android}
              mode="dropdown"
              selectedValue={this.state.category}
              onValueChange={(category) => this.setState({ category })}
            >
              <Picker.Item label="Category" value="Other" />
              <Picker.Item label="Plastic" value="Plastic" />
              <Picker.Item label="Glass" value="Glass" />
              <Picker.Item label="Metal" value="Metal" />
              <Picker.Item label="Paper" value="Paper" />
              <Picker.Item label="Wood" value="Wood" />
              <Picker.Item label="Compost" value="Compost" />
              <Picker.Item label="Landfill" value="Landfill" />
              <Picker.Item label="Category" value="Other" />
            </Picker>

            {/* <Item> */}
            {/* <Item> */}
            <Input
              placeholder="Search For Other Users"
              onChangeText={this.handleChange}
            />
            <Icon active name="search" />
            {/* </Item> */}
          </Item>
          {/* </Form> */}

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
    marketplace: state.activity.marketplace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMarketplaceAds: location => dispatch(getMarketplaceAdsThunk(location)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Marketplace)
