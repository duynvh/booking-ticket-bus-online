import axios from 'axios';
import * as types from './../constants/ActionType';
import * as configs from './../constants/Config';
export const signin = (formProps, callback) => async dispatch => {
    try {
        let url = `${configs.BASE_URL}signin`;
        const response = await axios.post(url,formProps);
        dispatch({ type: types.AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: types.AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const signout = () => async dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: types.AUTH_ERROR, payload: '' });
    dispatch({ type: types.AUTH_USER, payload: '' });
};