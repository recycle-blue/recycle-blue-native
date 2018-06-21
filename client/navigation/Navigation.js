import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Home, AddActivity, Camera } from '../components'

const Drawer = createDrawerNavigator({
  home: { screen: Home },
  addActivity: { screen: AddActivity }
}, {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

const PrimaryNav = createStackNavigator({
  home: { screen: Home },
  drawerStack: { screen: Drawer },
  camera: { screen: Camera }
}, {
    title: 'main',
    initialRouteName: 'drawerStack',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'blue' },
      title: 'RecycleBlue',
      headerTintColor: 'white',
      headerLeft: <Button title='pressme' onPress={() => {
        // navigation.navigate('drawerStack')
        navigation.toggleDrawer()
      }} />,
      headerRight: <Button title='Cam' onPress={() => {
        console.log('go to camera?')
        navigation.navigate('camera')
      }} />
    })
  }
)

export default PrimaryNav