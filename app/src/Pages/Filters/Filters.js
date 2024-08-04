import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

const Filters = props => {
  const { navigation, route } = props;
  const { filters, updateFilters } = route.params;
  const [localFilters, setLocalFilters] = useState(filters);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyFilters = () => {
    updateFilters(localFilters);
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || localFilters.outOfService;
    setShowDatePicker(Platform.OS === 'ios');
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      outOfService: currentDate.toISOString().split('T')[0]
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = Object.keys(localFilters).reduce((acc, key) => ({
      ...acc,
      [key]: ''
    }), {});
    setLocalFilters(clearedFilters);
    updateFilters(clearedFilters); 
  };

  const transformKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <View style={[styles.rootContainer, { paddingTop: 10 }]}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.back}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={require('../../Assets/Icons/back_arrow.png')}
          />
        </Pressable>
        <Text style={styles.heading}>Filters</Text>
        <View style={{width: 30}}/>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.contentContainerStyle}>
        <Text>Entity</Text>
        {/* {Object.keys(localFilters).filter(key => key !== 'createdDate' && key !== 'modifiedDate').map(key => (
          <View key={key} style={styles.filterRow}>
            <Text style={styles.filterLabel}>{transformKey(key)}:</Text>
            <TextInput
              style={styles.filterInput}
              value={localFilters[key]}
              onChangeText={text => setLocalFilters(prev => ({ ...prev, [key]: text }))}
            />
          </View>
        ))} */}
        {Object.keys(localFilters).map(key => (
          <View key={key} style={styles.filterRow}>
            <Text style={styles.filterLabel}>{transformKey(key)}:</Text>
            {key === 'outOfService' ? (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.filterInput}>{localFilters[key]}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date(localFilters[key] || new Date())}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </>
            ) : (
              <TextInput
                style={styles.filterInput}
                value={localFilters[key]}
                onChangeText={text => setLocalFilters(prev => ({ ...prev, [key]: text }))}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearFilters}>
          <Text style={styles.clear}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneBtn} onPress={handleApplyFilters}>
          <Text style={styles.done}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(Filters);

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'black',
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 16
  },
  backIcon: {
    height: 30,
    width: 30
  },
  heading: {
    fontSize: 22,
    color: '#9a999e'
  },
  clearBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  clear: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  clearBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginHorizontal: 6
  },
  clear: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  doneBtn: {
    backgroundColor: '#2b7abf',
    borderRadius: 20,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginHorizontal: 6
  },
  done: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  filterRow: {
  },
  contentContainerStyle: {
    flexGrow: 1, 
    paddingHorizontal: 16
  },
  filterLabel: {
    color: "#9a999e",
    fontSize: 15
  },
  filterInput: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    color: '#ffffff',
    borderRadius: 4,
    borderColor:'rgba(115, 113, 118, 1)',
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
  },
});
