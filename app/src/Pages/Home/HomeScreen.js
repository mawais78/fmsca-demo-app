import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Image, Pressable, TextInput, Text, ActivityIndicator, Dimensions } from 'react-native';
import { DataTable, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { connect } from 'react-redux';
import { getData } from '../../Redux/actions/userAction';

const windowWidth = Dimensions.get('window').width;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#ffffff',
    placeholder: '#cccccc',
    primary: '#9a999e', 
    onSurface: '#9a999e',
  }
};

const columns = [
  { key: 'createdDate', title: 'Created Date' },
  { key: 'modifiedDate', title: 'Modified Date' },
  { key: 'entity', title: 'Entity' },
  { key: 'status', title: 'Status' },
  { key: 'legalName', title: 'Legal Name' },
  { key: 'dbaName', title: 'DBA Name' },
  { key: 'address', title: 'Address' },
  { key: 'phone', title: 'Phone' },
  { key: 'dot', title: 'DOT' },
  { key: 'mcMxFF', title: 'MC/MX/FF' },
  { key: 'powerUnits', title: 'Power Units' },
  { key: 'outOfService', title: 'Out of Service' }
];

const getColumnWidth = (key) => {
  switch(key) {
    case 'legalName':
      return 200;
    case 'address':
      return 300;
    default:
      return 100;
  }
};

const HomeScreen = props => {
  const { navigation, getData, data, loading } = props;
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filters, setFilters] = useState({
    createdDate: '',
    modifiedDate: '',
    entity: '',
    status: '',
    legalName: '',
    dbaName: '',
    address: '',
    phone: '',
    dot: '',
    mcMxFF: '',
    powerUnits: '',
    outOfService: ''
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  useEffect(() => {
    getData({
      page
    })
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      let converted = data.map(item => ({
        createdDate: item.created_dt.split('T')[0],
        modifiedDate: item.data_source_modified_dt.split('T')[0],
        entity: item.entity_type,
        status: item.operating_status || 'Unknown',
        legalName: item.legal_name,
        dbaName: item.dba_name || 'N/A',
        address: item.mailing_address,
        phone: item.phone,
        dot: item.usdot_number,
        mcMxFF: item.mc_mx_ff_number || 'N/A',
        powerUnits: item.power_units.toString(),
        outOfService: item.out_of_service_date || 'N/A'
      }))
      setTableData(converted);
      setOriginalData(converted)
    }
  }, [data]);

  const handlePageChange = newPage => {
    const filterParams = {
        page: newPage,
        ...filters
    };
    getData(filterParams);
    setPage(newPage);
  };

  const applyFilters = () => {
    setPage(0);
    const filterParams = {
        page: 1,
        ...filters
    };
    getData(filterParams);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);


  useEffect(() => {
    if (sortConfig.key) {
      applySort();
    }
  }, [sortConfig]);

  const applySort = () => {
    let sortedData = [...tableData];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
        setTableData(originalData);
    } else {
        const lowerCaseText = text.toLowerCase();
        const filteredData = tableData.filter(item => {
            return Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(lowerCaseText)
            );
        });
        setTableData(filteredData);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalHeaderWidth = columns?.reduce((total, column) => total + getColumnWidth(column.key), 0);
  const startIndex = page * itemsPerPage + 1;
  const endIndex = (page + 1) * (Math.min((page + 1) * itemsPerPage, data.length)); 

  return (
    <View style={styles.rootContainer}>
      <Image style={styles.logo} source={require('../../Assets/Images/logo.png')}/>
      <Pressable
        onPress={() => {
          navigation.navigate('Filters', { filters, updateFilters });
        }}
        style={styles.filter}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      >
        <Image style={styles.filterIcon} source={require('../../Assets/Icons/filter.png')}/>
      </Pressable>
      <View style={{flex: 1}}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#9a999e"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <PaperProvider theme={theme}>
          <DataTable style={{flex: 1}}>
            <ScrollView horizontal style={{flex: 1}} contentContainerStyle={{ flexDirection: 'column'}}>
              <DataTable.Header style={{minWidth: totalHeaderWidth}}>
                {columns.map((column, key) => (
                  <DataTable.Title
                    key={key}
                    sortDirection={sortConfig.key === column.key ? sortConfig.direction : null}
                    onPress={() => handleSort(column.key)}
                    style={{...styles.cellHeader, width: getColumnWidth(column.key)}}
                    textStyle={styles.headerTxt}
                  >
                    {column.title}
                  </DataTable.Title>
                ))}
              </DataTable.Header>
                {
                  loading ? <View style={[styles.loaderContainer, { width: windowWidth }]}>
                    <ActivityIndicator size="large" color="#2b7abf" />
                  </View> : tableData.length ? tableData.map((item, key) => (
                  <DataTable.Row key={key}>
                    {columns.map(column => (
                      <DataTable.Cell
                        key={column.key}
                        style={{...styles.cell, width: getColumnWidth(column.key)}}
                        textStyle={{color: '#9a999e'}}
                      >
                        {item[column.key]}
                      </DataTable.Cell>
                    ))}
                  </DataTable.Row>
                )) : <Text style={styles.noData}>No Records</Text>
                }
            </ScrollView>

            <DataTable.Pagination
              page={page}
              // numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
              onPageChange={handlePageChange}
              label={`${startIndex}-${endIndex}`}
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </PaperProvider>
      </View>
      
    </View>
  );
};

const mapStateToProps = state => {
  return {
    data: state.user.data,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, {
  getData
})(HomeScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'black',
  },
  logo: {
    height: 80,
    width: 80,
    marginBottom: 16,
    alignSelf: 'center'
  },
  filter: {
    position: 'absolute',
    right: 16,
    top: 26,
  },
  filterIcon: {
    height: 30,
    width: 30
  },
  header: {
    width: 3000,
  },
  cellHeader: {
    width: 100,
    color: '#2b7abf',
    fontWeight: 'bold',
    fontSize: 15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell: {
    width: 100,
    color: '#9a999e'
  },
  headerTxt: {
    color: '#2b7abf', 
    fontWeight: 'bold', 
    fontSize: 15
  },
  searchInput: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    color: '#ffffff',
    borderRadius: 4,
    borderColor:'rgba(115, 113, 118, 1)',
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
  },
  noData: {
    color: '#9a999e',
    fontSize: 15,
    margin: 20,
  }
});
