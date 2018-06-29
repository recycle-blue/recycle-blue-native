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
  Icon,
  Item,
  Input,
  Picker,
  Spinner
} from 'native-base'
import { getMarketplaceAdsThunk } from '../store'
import { MapComp, AdCard } from '.'

class Marketplace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      searchText: '',
      isLoading: false,
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    // await this.props.getMarketplaceAdsThunk()
    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) return <Spinner color="blue" />
    const { marketplace } = this.props
    return (
      <Container>
        <View name='StaticFrame' style={styles.container}>
          <Tabs style={styles.tabs} tabBarPosition='overlayBottom' tabBarUnderlineStyle={{ backgroundColor: 'rgba(208, 230, 237, 1)' }} >
            <Tab heading="List" >
              <View style={{ position: 'absolute', top: 55, width: '100%' }}>
                <Card style={{ maxHeight: 40 }}>
                  <CardItem style={{ justifyContent: 'space-between' }}>
                    <Text style={{ paddingLeft: 10 }}>Img</Text>
                    <Text style={{ paddingLeft: 10 }}>Product Name</Text>
                    <Text>Points</Text>
                  </CardItem>
                </Card>
                <ScrollView>
                  {marketplace.length ? (
                    marketplace.map(ad => (
                      <AdCard
                        key={ad.id}
                        ad={ad}
                        navigation={this.props.navigation}
                      />
                    ))
                  ) : (
                      <Text style={{ textAlign: 'center' }}> No Available Products Yet! </Text>
                    )}
                </ScrollView>
              </View>
            </Tab>
            <Tab heading="Map" >
              <ScrollView>
                <MapComp view='ads' />
              </ScrollView>
            </Tab>
          </Tabs>
          <View style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            <Item rounded style={styles.searchBar}>
              <View style={styles.picker} >
                <Picker
                  name="category"
                  style={Platform.OS === 'ios' ? styles.iosPicker : styles.androidPicker}
                  mode="dropdown"
                  prompt='Category'
                  selectedValue={this.state.category}
                  onValueChange={(category) => this.setState({ category })}
                >
                  <Picker.Item label="Category" value="" />
                  <Picker.Item label="Plastic" value="Plastic" />
                  <Picker.Item label="Glass" value="Glass" />
                  <Picker.Item label="Metal" value="Metal" />
                  <Picker.Item label="Paper" value="Paper" />
                  <Picker.Item label="Wood" value="Wood" />
                  <Picker.Item label="Compost" value="Compost" />
                  <Picker.Item label="Landfill" value="Landfill" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              <Input
                style={{ flex: 2 }}
                placeholder="Search For Products"
                onChangeText={(searchText) => this.setState({ searchText })}
              />
              <View style={styles.searchIcon} >
                <Icon active name="search" />
              </View>
            </Item>
          </View>
        </View >
      </Container >
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
  searchBar: {
    margin: 5,
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  picker: {
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: 'rgba(208, 230, 237, 0.3)',
  },
  iosPicker: {
    height: 50,
    width: 1000,
  },
  androidPicker: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  searchIcon: {
    paddingRight: 3,
    backgroundColor: 'rgba(208, 230, 237, 0.3)',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    minHeight: 70,
    flex: 0.1,
  },
})

const mapStateToProps = store => {
  return {
    marketplace: store.ad.marketplace
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
