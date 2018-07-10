import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const category_article = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_CATEGORY_ARTICLE:
            return action.payload;
        case types.CREATE_CATEGORY_ARTICLE:
            return { ...state, message: action.payload };
        case types.EDIT_CATEGORY_ARTICLE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default category_article;

