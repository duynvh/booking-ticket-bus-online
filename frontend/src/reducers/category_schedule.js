import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const category_schedule = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_CATEGORY_SCHEDULE:
            return action.payload;
        case types.CREATE_CATEGORY_SCHEDULE:
            return { ...state, message: action.payload };
        case types.EDIT_CATEGORY_SCHEDULE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default category_schedule;

