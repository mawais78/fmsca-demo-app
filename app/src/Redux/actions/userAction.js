import axios from 'axios'
import { BASEURL } from '../../utils/constants'
import { FETCH_FATA_REQUEST_SENT, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CURRENT_LOCATION_REQUEST_SENT, CURRENT_LOCATION_SUCCESS, CURRENT_LOCATION_FAIL } from '../type'

import { store } from '../store';
// const customAxios = axios.create({
//     timeout: 10000
// });

// customAxios.interceptors.request.use((configs) => {
//     const { token, lang } = store.getState().auth || {};


//     configs.headers = {
//         'Accept-Language': lang,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Authorization': `Bearer ${token}`
//     }

//     return configs;
// }, (error) => {
//     return Promise.reject(error);
// });

// customAxios.interceptors.response.use((resp) => {

//     return resp;
// }, (error) => {
//     return Promise.reject(error);
// });

const mapFiltersToApiParams = (filters) => {
    let apiParams = {};
    if (filters.entity) apiParams.entity_type = filters.entity;
    if (filters.status) apiParams.operating_status = filters.status;
    if (filters.legalName) apiParams.legal_name = filters.legalName;
    if (filters.dbaName) apiParams.dba_name = filters.dbaName;
    if (filters.address) apiParams.physical_address = filters.address;
    if (filters.phone) apiParams.phone = filters.phone;
    if (filters.dot) apiParams.usdot_number = filters.dot;
    if (filters.mcMxFF) apiParams.mc_mx_ff_number = filters.mcMxFF;
    if (filters.powerUnits) apiParams.power_units = filters.powerUnits;
    if (filters.createdDate) apiParams.created_dt = filters.createdDate;
    if (filters.modifiedDate) apiParams.data_source_modified_dt = filters.modifiedDate;
    if (filters.outOfService) apiParams.out_of_service_date = filters.outOfService;
    if (filters.page) apiParams.page = filters.page;
    return apiParams;
};

export const getData = (params) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_FATA_REQUEST_SENT
        })

        const queryParams = new URLSearchParams(mapFiltersToApiParams(params)).toString();
        let URL = `${BASEURL}/entity?${queryParams}`;

        const { data } = await axios.get(URL);
        dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_DATA_FAIL,
            message: error?.response?.data?.message || error?.message
        })  
    }
}

export const sendCurrentLocation = (payload) => async (dispatch) => {
    try {
        console.log(payload, "sendCurrentLocation")
        dispatch({
            type: CURRENT_LOCATION_REQUEST_SENT
        })
        const { data } = await axios.post(`${BASEURL}/tracking`, payload)
        dispatch({
            type: CURRENT_LOCATION_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        dispatch({
            type: CURRENT_LOCATION_FAIL,
            message: error?.response?.data?.message || error?.message
        })  
    }
}
