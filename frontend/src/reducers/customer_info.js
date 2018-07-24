import * as types from './../constants/ActionType';
let defaultState = {
    name: '',
    email: '',
    phone: '',
    token: ''
};

const customer_info = (state = defaultState, action) => {
    switch(action.type) {
        case types.USER_FETCH:
            return {
                ...state,
                name: action.name,
                email: action.email,
                phone: action.phone,
            }; 
        case types.FETCH_TOKEN:
            return {
                ...state,
                token: action.token
            };   
        case types.SIGN_OUT:
            return defaultState;
        default:
			return state;
    }
}

export default customer_info;

