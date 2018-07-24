import * as types from './../constants/ActionType';
import moment from 'moment';
let defaultState = {
    quantity: 1,
    startDate: moment(),
    schedule_id: '',
    category_schedule_id: '',
    schedule_detail_id: '',
    seats: [],
    notice: false
};

const reverse = (state = defaultState, action) => {
	let {quantity, schedule_id, startDate, category_schedule_id} = action;
    switch(action.type) {
        case types.BOOKING_TICKET:
            return {...state, quantity, schedule_id, startDate, category_schedule_id};
        case types.ADD_SEAT:
            state.seats.push(action.seat);
            return {...state};
        case types.REMOVE_SEAT:
            var index = state.seats.indexOf(action.seat);
            if(index  > -1) state.seats.splice(index, 1);
            return {...state};
        case types.CHANGE_SCHEDULE_DETAIL:
            console.log(action.schedule_detail_id);
            state.schedule_detail_id = action.schedule_detail_id;
            return {...state};
        case types.CLEAR_SEAT:
            state.seats = [];
            return {...state};
        case types.CLEAR_NOTICE:
            state.notice = false;
            return {...state};
        case types.SHOW_NOTICE:
            state.notice = true;
            return {...state};
        default:
			return state;
    }
}

export default reverse;

