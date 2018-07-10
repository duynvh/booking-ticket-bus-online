import axios from 'axios';
import * as types from './../constants/ActionType';
import * as configs from './../constants/Config';
import * as notices from './../constants/Notice';

export const listCategoryArticle = () => async dispatch => {
    try {
        let url = `${configs.BASE_URL}category-article`;
        const response = await axios.get(url);
        dispatch({ type: types.LIST_CATEGORY_ARTICLE, payload: response.data });
    } catch (e) {
        
    }
};

export const createCategoryArticle = (formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}category-article`;
        const response = await axios.post(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.CREATE_CATEGORY_ARTICLE, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.CREATE_CATEGORY_ARTICLE, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.CREATE_CATEGORY_ARTICLE, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const editCategoryArticle = (id,formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}category-article/${id}`;
        const response = await axios.put(url,formProps);
        if(response.data.error) {
            dispatch({ type: types.EDIT_CATEGORY_ARTICLE, payload: notices.EXISTING_NAME_GROUP }); 
        }
        else {
            dispatch({ type: types.EDIT_CATEGORY_ARTICLE, payload: response.data.message });           
            callback(); 
        }
    } catch (e) {
        dispatch({ type: types.EDIT_CATEGORY_ARTICLE, payload: notices.ERROR_MESSAGE_CREATE_GROUP });
    }
};

export const clearMsg = () => async dispatch => {
    dispatch({ type: types.CLEAR_MSG }); 
}