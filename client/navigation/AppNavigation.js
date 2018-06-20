import { StackNavigator } from 'react-navigation'
import AddProduct from '../components'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AddProduct: { screen: AddProduct }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'AddProduct'
  })

export default PrimaryNav