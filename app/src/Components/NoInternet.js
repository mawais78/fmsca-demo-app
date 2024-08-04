import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

const {width} = Dimensions.get('window');

const NoInternet = () => {
  const netInfo = useNetInfo();
  if (!netInfo.isConnected) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>No Internet</Text>
        <Text>Please check your internet connection</Text>
      </View>
    );
  }
  return null;
};

export default NoInternet;

export const NoInternetToast = () => {
  const netInfo = useNetInfo();
  if (!netInfo.isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
  offlineContainer: {
    backgroundColor: '#d70015',
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  offlineText: {fontSize: 11, color: '#fff'},
});
