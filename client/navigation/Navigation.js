import React from 'react'
import { Text, Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Home, AddProduct } from '../components'

const Drawer = createDrawerNavigator({
  home: { screen: Home },
  addProduct: { screen: AddProduct }
}, {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

const PrimaryNav = createStackNavigator({
  home: { screen: Home },
  drawerStack: { screen: Drawer }
}, {
    title: 'main',
    initialRouteName: 'drawerStack',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'blue' },
      title: 'RecycleBlue',
      headerTintColor: 'white',
      headerLeft: <Button title='pressme' onPress={() => navigation.toggleDrawer()} />
    })
  }
)

export default PrimaryNav