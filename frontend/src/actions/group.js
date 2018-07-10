import axios from 'axios';
import * as types from './../constants/ActionType';
import * as configs from './../constants/Config';
import * as notices from './../constants/Notice';

export const listGroup = () => async dispatch => {
    try {
        let url = `${configs.BASE_URL}group`;
        const response = await axios.get(url);
        dispatch({ type: types.LIST_GROUP, payload: response.data });
    } catch (e) {
        
    }
};

export const createGroup = (formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}group`;
        const response = await axios.post(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.CREATE_GROUP, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.CREATE_GROUP, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.CREATE_GROUP, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const editGroup = (id,formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}group/${id}`;
        const response = await axios.put(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.EDIT_GROUP, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.EDIT_GROUP, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.EDIT_GROUP, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const clearMsg = () => async dispatch => {
    dispatch({ type: types.CLEAR_MSG }); 
}