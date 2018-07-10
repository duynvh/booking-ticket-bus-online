import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const contact = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_CONTACT:
            return action.payload;
        case types.CREATE_CONTACT:
            return { ...state, message: action.payload };
        case types.EDIT_CONTACT:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default contact;

