import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const slider = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_SLIDER:
            return action.payload;
        case types.CREATE_SLIDER:
            return { ...state, message: action.payload };
        case types.EDIT_SLIDER:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default slider;

