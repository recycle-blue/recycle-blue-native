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
import { MapComp, AdCard } from '../'
import {
  getMarketplaceAdsThunk, getRecycleLocationsThunk,
  getAdLocationsThunk,
  getUserLocationAction,
  selectMarkerAction,
  setFetch,
  getLocationsAction,
  getCategoriesThunk
} from '../../store'
import { colors } from '../color-palette'
const geoLocation = navigator.geolocation

class Marketplace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      searchText: '',
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.props.getCategories();
    geoLocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords
      const userLocation = { latitude: latitude, longitude: longitude }
      const locationStr = Object.keys(userLocation)
        .map(key => userLocation[key])
        .join(',')
      this.props.fetchAdLocations(locationStr)
      this.props.setUserLocation(userLocation)
      if (this.state.isLoading) this.setState({ isLoading: false })
    })
  }

  // searchAds = (text) => {
  //   geoLocation.getCurrentPosition(location => {
  //     const { latitude, longitude } = location.coords
  //     const userLocation = { latitude: latitude, longitude: longitude }
  //     const locationStr = Object.keys(userLocation)
  //       .map(key => userLocation[key])
  //       .join(',')
  //     this.props.fetchAdLocations(locationStr,this.state.category,text);

  //   })
  // }


  componentWillUpdate(nextProps,nextState) {
   // console.log(nextState)
    if(nextState.category !== this.state.category || nextState.searchText !== this.state.searchText) {
      const category = this.props.categories.find( elem => elem.name === nextState.category)
      geoLocation.getCurrentPosition( async (location) => {
        const { latitude, longitude } = location.coords
        const userLocation = { latitude: latitude, longitude: longitude }
        const locationStr = Object.keys(userLocation)
          .map(key => userLocation[key])
          .join(',')
        await this.props.fetchAdLocations(locationStr, category, nextState.searchText);
        if (this.state.isLoading) this.setState({ isLoading: false })
     })
    }
  }

  render() {
    const { locations, categories } = this.props
    console.log(locations.length);
    if (this.state.isLoading) {
      return <Spinner color={colors.main} />
    }
    return (
      <Container>
        <View name='StaticFrame' style={styles.container}>
          <Tabs style={styles.tabs} tabBarPosition='overlayBottom' tabBarUnderlineStyle={Platform.OS === 'ios' ? { backgroundColor: colors.midDark } : { backgroundColor: colors.light }} >
            <Tab heading="List" >
              <View style={{ backgroundColor: 'rgba(255,255,255,0)', height: 60 }} />
              <ScrollView>
                {locations.length ? (
                  locations.map((ad) => {
                    return <AdCard
                      key={ad.ad.id}
                      ad={{ ...ad.ad, distance: ad.distance }}
                      navigation={this.props.navigation}
                    />
                  })
                ) : (
                    <Text style={{ textAlign: 'center' }}> No Available Products Yet! </Text>
                  )}
              </ScrollView>
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
                  onValueChange={(category) => this.setState({ category})}
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
                onChangeText={(searchText) => this.setState({searchText})}
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
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBar: {
    margin: 5,
    backgroundColor: colors.white + 'FF',
  },
  picker: {
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: colors.light,
  },
  iosPicker: {
    height: 50,
    width: 1000,
  },
  androidPicker: {
    backgroundColor: 'transparent',
  },
  searchIcon: {
    paddingRight: 3,
    backgroundColor: colors.light,
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
    marketplace: store.ad.marketplace,
    locations: store.location.locations,
    userLocation: store.location.userLocation,
    isFetching: store.location.isFetching,
    categories: store.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMarketplaceAds: location => dispatch(getMarketplaceAdsThunk(location)),
    fetchRecycleLocations: locationStr =>
      dispatch(getRecycleLocationsThunk(locationStr)),
    fetchAdLocations: (locationStr,category,text) => dispatch(getAdLocationsThunk(locationStr,category,text)),
    setUserLocation: location => dispatch(getUserLocationAction(location)),
    selectMarker: marker => dispatch(selectMarkerAction(marker)),
    setFetch: status => dispatch(setFetch(status)),
    resetLocations: () => dispatch(getLocationsAction([])),
    getCategories: () => dispatch(getCategoriesThunk())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Marketplace)
