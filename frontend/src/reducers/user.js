import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const user = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_USER:
            return action.payload;
        case types.CREATE_USER:
            return { ...state, message: action.payload };
        case types.EDIT_USER:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default user;

