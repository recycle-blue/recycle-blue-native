import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
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
  SocialMedia
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
    friends: { screen: Friends },
    singleFriend: { screen: Dashboard },
    socialMedia: { screen: SocialMedia },
    searchUsers: { screen: SearchUsers },
    addComment: { screen: AddComment },
    commentCard: { screen: CommentCard }
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
          title="Menu"
          onPress={() => {
            navigation.toggleDrawer()
          }}
        />
      ),
      headerRight: (
        <Button
          title="Cam"
          onPress={() => {
            navigation.navigate('camera')
          }}
        />
      ),
    }),
  }
)

const InitialNav = createSwitchNavigator({
  login: { screen: Login },
  primaryNav: { screen: PrimaryNav },
})

export default InitialNav
