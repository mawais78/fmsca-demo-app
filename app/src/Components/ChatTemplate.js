
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const Template = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.rowSapceBtwn}>
        <Text style={styles.templateName}>{t('template')}_1</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewTemplate')}>
          <Image
            style={styles.pencil}
            source={require('../Assets/Icons/eidt_pencil.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.template}>
        Hi!{'\n'}{t('interestedRequest')}
      </Text>
    </View>
  );
};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, {})(Template);

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 12,
    borderColor: '#EEEEEE',
    borderWidth: 0.5,
    shadowColor: '#A5A6A1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1,
    elevation: 3,
    backgroundColor: 'white',
    marginVertical: 4,
  },
  templateName: {
    fontSize: 16,
    color: '#031C37',
    marginBottom: 14,
    fontWeight: '500',
  },
  template: {
    color: '#031C37',
    fontSize: 14,
  },
  rowSapceBtwn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pencil: {
    height: 16,
    width: 16,
  },
});
