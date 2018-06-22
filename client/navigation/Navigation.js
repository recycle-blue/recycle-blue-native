import React from 'react'
import { Button } from 'react-native'

import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Home, AddActivity, Camera, MapComp, Dashboard, Product } from '../components'

import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Login, AddActivity, Camera, MapComp, Dashboard } from '../components'

const Drawer = createDrawerNavigator(
  {
    dashboard: { screen: Dashboard },
    addActivity: { screen: AddActivity },
    map: { screen: MapComp },
    camera: { screen: Camera },
    product: { screen: Product }
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'dashboard',
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

const PrimaryNav = createStackNavigator(
  {
    drawerStack: { screen: Drawer },
    addActivity: { screen: AddActivity },
    product: { screen: Product },
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
  primaryNav: { screen: PrimaryNav }
})

export default InitialNav
