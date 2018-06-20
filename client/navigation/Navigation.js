import React from 'react'
import { Text, Button } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Home, AddProduct } from '../components'
// import { DrawerStack } from '.'

const Drawer = createDrawerNavigator({
  home: { screen: Home },
  addProduct: { screen: AddProduct }
})

const DrawerNavigation = createStackNavigator({
  drawer: { screen: Drawer }
}, {

  }
)

const PrimaryNav = createStackNavigator({
  home: { screen: Home },
  drawerStack: { screen: Drawer }
  // AddProduct: { screen: AddProduct }
}, {
    title: 'main',
    initialRouteName: 'drawerStack',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'blue' },
      title: 'RecycleBlue',
      headerTintColor: 'white',
      headerLeft: <Button title='pressme' onPress={() => navigation.navigate('DrawerOpen')} />
    })
  }
)

export default PrimaryNav