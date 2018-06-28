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
  Dashboard,
  Activity,
  LoadingScreen,
  Leaderboard,
  Friends,
  ActivityCard,
  SearchUsers,
  AddComment,
  CommentCard,
  SocialMedia,
  Logout,
  Feed,
} from '../components'

const Drawer = createDrawerNavigator(
  {
    dashboard: { screen: Dashboard },
    addActivity: { screen: AddActivity },
    addAd: { screen: AddAd },
    map: { screen: MapComp },
    camera: { screen: Camera },
    activity: { screen: Activity },
    loadingScreen: { screen: LoadingScreen },
    leaderboard: { screen: Leaderboard },
    feed: { screen: Feed },
    friends: { screen: Friends },
    singleFriend: { screen: Dashboard },
    socialMedia: { screen: SocialMedia },
    searchUsers: { screen: SearchUsers },
    addComment: { screen: AddComment },
    commentCard: { screen: CommentCard },
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
    camera: { screen: Camera },
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
            navigation.navigate('camera')
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
})

export default InitialNav
