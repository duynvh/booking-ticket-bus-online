import axios from 'axios';
import * as types from './../constants/ActionType';
import * as configs from './../constants/Config';
import * as notices from './../constants/Notice';

export const listRouteDeparture = () => async dispatch => {
    try {
        let url = `${configs.BASE_URL}route-departure`;
        const response = await axios.get(url);
        dispatch({ type: types.LIST_ROUTE_DEPARTURE, payload: response.data });
    } catch (e) {
        
    }
};

export const createRouteDeparture = (formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}route-departure`;
        const response = await axios.post(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.CREATE_ROUTE_DEPARTURE, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.CREATE_ROUTE_DEPARTURE, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.CREATE_ROUTE_DEPARTURE, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const editRouteDeparture = (id,formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}route-departure/${id}`;
        const response = await axios.put(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.EDIT_ROUTE_DEPARTURE, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.EDIT_ROUTE_DEPARTURE, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.EDIT_ROUTE_DEPARTURE, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const clearMsg = () => async dispatch => {
    dispatch({ type: types.CLEAR_MSG }); 
}