import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const schedule_info = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_SCHEDULE_INFO:
            return action.payload;
        case types.CREATE_SCHEDULE_INFO:
            return { ...state, message: action.payload };
        case types.EDIT_SCHEDULE_INFO:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default schedule_info;

