import axios from 'axios';
import * as types from './../constants/ActionType';
import * as configs from './../constants/Config';
import * as notices from './../constants/Notice';

export const listSlider = () => async dispatch => {
    try {
        let url = `${configs.BASE_URL}slider`;
        const response = await axios.get(url);
        dispatch({ type: types.LIST_SLIDER, payload: response.data });
    } catch (e) {
        
    }
};

export const createSlider = (formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}slider`;
        const response = await axios.post(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.CREATE_SLIDER, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.CREATE_SLIDER, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.CREATE_SLIDER, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const editSlider = (id,formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}slider/${id}`;
        const response = await axios.put(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.EDIT_SLIDER, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.EDIT_SLIDER, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.EDIT_SLIDER, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const clearMsg = () => async dispatch => {
    dispatch({ type: types.CLEAR_MSG }); 
}