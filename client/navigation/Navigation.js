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
  Map,
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
    Dashboard: { screen: UserDashboard },
    AddActivity: { screen: AddActivity },
    AddAd: { screen: AddAd },
    Map: { screen: Map },
    Camera: { screen: Camera },
    Activity: { screen: Activity },
    LoadingScreen: { screen: LoadingScreen },
    'Post Activity': { screen: Camera },
    Marketplace: { screen: Marketplace },
    Leaderboard: { screen: Leaderboard },
    Feed: { screen: Feed },
    Friends: { screen: Friends },
    SearchUsers: { screen: SearchUsers },
    Logout: { screen: Logout },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'Dashboard',
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
  Login: { screen: Login },
  primaryNav: { screen: PrimaryNav },
  FriendDashboard: { screen: FriendDashboard },
})

export default InitialNav
