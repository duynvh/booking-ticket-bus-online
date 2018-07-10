import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const province = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_PROVINCE:
            return action.payload;
        case types.CREATE_PROVINCE:
            return { ...state, message: action.payload };
        case types.EDIT_PROVINCE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default province;

