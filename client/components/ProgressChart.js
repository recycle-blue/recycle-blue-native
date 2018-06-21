import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import SVG from 'expo'
const {
  Path,
  Text
} = SVG


export default class ProgressChart extends React.Component {
  constructor(props) {
    super()

  }
  render() {
    console.log("what are the props here?", this.props)




    return (
      <ProgressCircle
        style={{ height: 200 }}
        progress={0.7}
        progressColor={'rgb(134, 65, 244)'}
        startAngle={- Math.PI * 0.8}
        endAngle={Math.PI * 0.8}

      >
      </ProgressCircle >
    )
  }

}

