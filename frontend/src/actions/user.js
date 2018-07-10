import axios from 'axios';
import * as types from './../constants/ActionType';
import * as configs from './../constants/Config';
import * as notices from './../constants/Notice';

export const listUser = () => async dispatch => {
    try {
        let url = `${configs.BASE_URL}user`;
        const response = await axios.get(url);
        dispatch({ type: types.LIST_USER, payload: response.data });
    } catch (e) {
        
    }
};

export const createUser = (formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}user`;
        const response = await axios.post(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.CREATE_USER, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.CREATE_USER, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.CREATE_USER, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const editUser = (id,formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}user/${id}`;
        const response = await axios.put(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.EDIT_USER, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.EDIT_USER, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.EDIT_USER, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const clearMsg = () => async dispatch => {
    dispatch({ type: types.CLEAR_MSG }); 
}