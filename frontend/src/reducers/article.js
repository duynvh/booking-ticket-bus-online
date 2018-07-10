import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const article = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_ARTICLE:
            return action.payload;
        case types.CREATE_ARTICLE:
            return { ...state, message: action.payload };
        case types.EDIT_ARTICLE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default article;

