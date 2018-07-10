import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const transhipment_office = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_TRANSHIPMENT_OFFICE:
            return action.payload;
        case types.CREATE_TRANSHIPMENT_OFFICE:
            return { ...state, message: action.payload };
        case types.EDIT_TRANSHIPMENT_OFFICE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default transhipment_office;

