import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera, Permissions, FileSystem } from 'expo'
import { Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import { savePhotoThunk } from '../store'

const mapDispatchToProps = (dispatch) => ({
  storePicture: (data) => dispatch(savePhotoThunk(data))
})

class TestCamera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  componentDidMount() {
    // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photo').catch(e => {
    // console.log(e, 'Directory Exists')
    // })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: null,
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{ color: 'white' }} name='arrow-back' />
        </Button>
      )
    }
  }
  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true
      }

      const data = await this.camera.takePictureAsync(options)
      console.log(data)
      this.savePicture(data)
    }
  }

  savePicture = async (photo) => {
    const photoData = `data:image/jpg;base64,${photo.base64}`
    await this.props.storePicture(photoData)
    this.props.navigation.navigate('addActivity') //Change to nav to loading screen!
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={(cam) => { this.camera = cam }}
            style={styles.preview}
            type={this.state.type}
            flashMode={Camera.Constants.FlashMode.on}
            permissionDialogTitle="Permission to use camera"
            permissionDialogMessage="We need your permission to use your camera"
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{
                  // flex: 0.1,
                  // alignSelf: 'flex-end',
                  // alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  })
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // flex: 0.1,
                  // alignSelf: 'flex-end',
                  // alignItems: 'center',
                }}
                onPress={this.takePicture}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}CAPTURE{' '}
                </Text>
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
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    // backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

export default connect(null, mapDispatchToProps)(TestCamera)