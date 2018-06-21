import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Home, AddProduct } from '../components'
import MapComp from '../components/MapComp'

const Drawer = createDrawerNavigator(
  {
    home: { screen: Home },
    addProduct: { screen: AddProduct },
    map: { screen: MapComp },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
)

const PrimaryNav = createStackNavigator(
  {
    home: { screen: Home },
    drawerStack: { screen: Drawer },
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
        <Button title="pressme" onPress={() => navigation.toggleDrawer()} />
      ),
    }),
  }
)

export default PrimaryNav
