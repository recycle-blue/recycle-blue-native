import React from 'react'
import { VictoryPie } from 'victory-native'
import { View, Dimensions, StyleSheet } from 'react-native'
import Svg, { Text } from 'react-native-svg'
import { colors } from '../color-palette'

export default class ProgressChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Potato: 500,
      Bronze: 2000,
      Silver: 5000,
    }
  }
  render() {
    const totalPoints = this.props.selectedUser.totalPoints
    const nextMilestonePoints = this.state[this.props.selectedUser.milestone.description]
    const percentComplete = Math.ceil((totalPoints / nextMilestonePoints) * 100)
    const { height, width } = Dimensions.get('screen');
    const halfheight = height / 2
    return (
      <View style={styles.container}>
        <Svg height={halfheight} width={width}>
          <VictoryPie
            data={[
              { x: 1, y: totalPoints, label: ' ' },
              { x: 2, y: nextMilestonePoints - totalPoints, opacity: 0.3, label: " " }
            ]}
            style={{
              data: {
                opacity: (d) => d.opacity
              },
              labels: {
                fill: `${colors.main}`,
                fontSize: 20,
                fontWeight: "bold"
              }
            }}

            labelRadius={1}
            colorScale={[`${colors.midDark}`, `${colors.midDark}`,]}
            width={width}
            innerRadius={100}
            standalone={false}
          />
          <Text
            fill={colors.dark}
            fontSize="20"
            fontWeight="bold"
            style='font-family:sans-serif'
            x={`${width / 2}`}
            y={`${(halfheight / 8)}`}
            textAnchor="middle"
          >Milestone Progress</Text>
          <Text
            fill={colors.dark}
            fontSize="20"
            fontWeight="bold"
            style='font-family:sans-serif'
            x={`${width / 2}`}
            y={`${(halfheight / 1.7)}`}
            textAnchor="middle"
          >{percentComplete}%</Text>
        </Svg>
      </View >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  }
})


