import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import { savePhotoThunk, clearActivityAction } from '../store'
import {
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import { LoadingScreen } from '.'

const mapDispatchToProps = (dispatch) => ({
  storePicture: (data) => dispatch(savePhotoThunk(data)),
  clearActivity: () => dispatch(clearActivityAction())
})

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
}

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
}

class TestCamera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      flash: 'off',
      barcodeScanning: 'off',
      loadingToggle: false,
    }
  }

  toggleFlash = () => {
    this.setState({ flash: flashModeOrder[this.state.flash] })
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: null,
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{ color: 'white' }} name='arrow-back' />
        </Button>
      ),
      drawerLabel: () => null
    }
  }
  // fakePicture = () => {
  //   this.setState({ ...this.state, loadingToggle: true })
  // }
  // componentDidUpdate() {
  //   console.log('cdm', this.state.loadingToggle)
  //   if (this.state.loadingToggle) {
  //     this.takePicture()
  //   }
  // }
  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true
      }
      console.log('is expo broken?')
      const data = await this.camera.takePictureAsync(options)
      console.log('nope! still working for now!')
      await this.props.clearActivity()
      this.savePicture(data)
      this.setState({ loadingToggle: true })
    }
  }

  savePicture = async (photo) => {
    const photoData = `data:image/jpg;base64,${photo.base64}`
    await this.props.storePicture(photoData)
    this.props.navigation.navigate('AddActivity')
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else if (this.state.loadingToggle) {
      return <LoadingScreen />
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={(cam) => { this.camera = cam }}
            style={styles.preview}
            type={this.state.type}
            flashMode={this.state.flash}
            barcodeScanning={this.state.barcodeScanning}
            permissionDialogTitle="Permission to use camera"
            permissionDialogMessage="We need your permission to use your camera"
          >
            <View style={styles.topBar}>
              <TouchableOpacity onPress={this.toggleFlash} >
                <MaterialIcons name={flashIcons[this.state.flash]} size={36} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}>
              <TouchableOpacity onPress={this.takePicture} >
                <Ionicons name="ios-radio-button-on" size={100} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View >
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  bottomBar: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 25,
  },
  topBar: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    width: '100%',
    padding: 10,
  }
})

export default connect(null, mapDispatchToProps)(TestCamera)
