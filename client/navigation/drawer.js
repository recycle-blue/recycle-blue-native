import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { Thumbnail, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { colors } from '../components/color-palette'

const CustomDrawer = (props) => (
  <ScrollView style={styles.drawer} >
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Dashboard')
      }}
      style={styles.header}
    >
      <Thumbnail source={{ uri: props.user.imageUrl }} small style={{ flex: 1, }} />
      <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold', flex: 3 }]}>{props.user.firstName} {props.user.lastName}</Text>
      <Text note style={styles.text}>Pts: {props.user.totalPoints}</Text>
    </TouchableOpacity>
    <DrawerItems {...props} />
  </ScrollView>
)

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.light
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.dark,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.midDark,
    alignItems: 'center',
    height: 60,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  }
})

const mapState = (store) => ({
  user: store.user
})

export default connect(mapState)(CustomDrawer)