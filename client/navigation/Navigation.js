import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Home, AddActivity, Camera, MapComp } from '../components'

const Drawer = createDrawerNavigator(
  {
    home: { screen: Home },
    addActivity: { screen: AddActivity },
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
    camera: { screen: Camera },
    addActivity: { screen: AddActivity },
  },
  {
    title: 'main',
    initialRouteName: 'home',
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

export default PrimaryNav
