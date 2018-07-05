import React from 'react'
import { Platform } from 'react-native'
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
import DrawerHeader from './drawer'
import { ColorPalette, colors } from '../components/color-palette'

const Drawer = createDrawerNavigator(
  {
    Dashboard: { screen: UserDashboard },
    AddActivity: { screen: AddActivity },
    AddAd: { screen: AddAd },
    Map: { screen: Map },
    Activity: { screen: Activity },
    LoadingScreen: { screen: LoadingScreen },
    'Post Activity': { screen: Camera },
    Marketplace: { screen: Marketplace },
    Leaderboard: { screen: Leaderboard },
    Feed: { screen: Feed },
    Friends: { screen: Friends },
    'Search Users': { screen: SearchUsers },
    Logout: { screen: Logout },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'Dashboard',
    contentComponent: DrawerHeader
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
      headerStyle: { backgroundColor: colors.main, height: 45 },
      title: 'RecycleBlue',
      headerTitleStyle: [
        Platform.OS === 'ios'
          ? { textAlign: 'center', alignSelf: 'center', width: '100%' }
          : {
            textAlign: 'center',
            alignSelf: 'center',
            width: '100%',
            paddingRight: 30,
          },
      ],
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
