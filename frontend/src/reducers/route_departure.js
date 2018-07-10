import * as types from './../constants/ActionType';
let defaultState = {
    message: ''
};

const route_departure = (state = defaultState, action) => {
    switch(action.type) {
        case types.LIST_ROUTE_DEPARTURE:
            return action.payload;
        case types.CREATE_ROUTE_DEPARTURE:
            return { ...state, message: action.payload };
        case types.EDIT_ROUTE_DEPARTURE:
            return { ...state, message: action.payload };
        case types.CLEAR_MSG:
            return { ...state, message: ''};
        default:
			return state;
    }
}

export default route_departure;

