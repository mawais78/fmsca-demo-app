import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ErrorMessage = ({message, varient}) => {
  return (
    <View
      style={[styles.errorMessage, {backgroundColor: varient || '#FF0000'}]}>
      <Text
        style={{color: '#fff', flex: 1, flexWrap: 'wrap', textAlign: 'center'}}>
        {message}
      </Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorMessage: {
    position: 'absolute',
    paddingTop: 50,
    top: 0,
    zIndex: 2,
    elevation: 2,
    alignSelf: 'center',
    borderRadius: 5,
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
});
