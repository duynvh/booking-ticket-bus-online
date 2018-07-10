import * as types from './../constants/ActionType';
let defaultState = {
    authenticated: '',
  	errorMessage: null
};

const auth = (state = defaultState, action) => {

	switch(action.type){

		case types.AUTH_USER:
			return { ...state, authenticated: action.payload };
		case types.AUTH_ERROR:
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
}

export default auth;