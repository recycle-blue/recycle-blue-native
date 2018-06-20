import { createDrawerNavigator } from 'react-navigation'
import { AddProduct } from '../components'

const DrawerStack = createDrawerNavigator({
  addProduct: { screen: AddProduct }
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { background: 'blue' },
      title: 'RecycleBlue',
      headerTintColor: 'white'
    })
  }
)

export default DrawerStack