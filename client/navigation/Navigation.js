import React from 'react'
import { Button, Icon, Text } from 'native-base'
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import {
  Login,
  AddActivity,
  AddAd,
  Camera,
  MapComp,
  UserDashboard,
  FriendDashboard,
  Activity,
  LoadingScreen,
  Leaderboard,
  Friends,
  SearchUsers,
  Logout,
  Feed,
  Marketplace,
} from '../components'

const Drawer = createDrawerNavigator(
  {
    dashboard: { screen: UserDashboard },
    'Post Activity': { screen: Camera },
    Marketplace: { screen: Marketplace },
    map: { screen: MapComp },
    leaderboard: { screen: Leaderboard },
    feed: { screen: Feed },
    friends: { screen: Friends },
    searchUsers: { screen: SearchUsers },
    addActivity: { screen: AddActivity },
    addAd: { screen: AddAd },
    activity: { screen: Activity },
    loadingScreen: { screen: LoadingScreen },
    logout: { screen: Logout },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'dashboard',
  }
)

const PrimaryNav = createStackNavigator(
  {
    drawerStack: { screen: Drawer },
    'Post Activity': { screen: Camera },
  },
  {
    title: 'main',
    initialRouteName: 'drawerStack',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'blue' },
      title: 'RecycleBlue',
      headerTintColor: 'white',
      headerLeft: (
        <Button
          transparent
          onPress={() => {
            navigation.toggleDrawer()
          }}
        >
          <Text>
            <Icon ios="ios-menu" android="md-menu" style={{ color: 'white' }} />
          </Text>
        </Button>
      ),
      headerRight: (
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Post Activity')
          }}
        >
          <Text>
            <Icon name="add" style={{ color: 'white' }} />
          </Text>
        </Button>
      ),
    }),
  }
)

const InitialNav = createSwitchNavigator({
  login: { screen: Login },
  primaryNav: { screen: PrimaryNav },
  friendDashboard: { screen: FriendDashboard },
})

export default InitialNav
