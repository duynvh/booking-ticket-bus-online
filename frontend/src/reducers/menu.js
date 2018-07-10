import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const menu = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_MENU:
            return action.payload;
        case types.CREATE_MENU:
            return { ...state, message: action.payload };
        case types.EDIT_MENU:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return {...state, message: ''};
        default:
			return state;
    }
}

export default menu;

