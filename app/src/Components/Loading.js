import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { BallIndicator } from 'react-native-indicators'

const Loading = ({ error }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <View style={styles.flexCenter}>
        <BallIndicator size={26} color="#009B4C" />
        <Text style={styles.justaMomentTxt}>{error || 'Just a moment'}</Text>
      </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  flexCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 303,
    borderRadius: 12,
    alignSelf: 'center',
    padding: 20,
    marginVertical: 6,
  },
  justaMomentTxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#013B7A',
    marginTop: 26,
  },
})
