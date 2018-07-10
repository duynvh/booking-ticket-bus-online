import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const schedule = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_SCHEDULE:
            return action.payload;
        case types.CREATE_SCHEDULE:
            return { ...state, message: action.payload };
        case types.EDIT_SCHEDULE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default schedule;

