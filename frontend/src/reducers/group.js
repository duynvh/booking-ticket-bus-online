import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const group = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_GROUP:
            return action.payload;
        case types.CREATE_GROUP:
            return { ...state, message: action.payload };
        case types.EDIT_GROUP:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default group;

