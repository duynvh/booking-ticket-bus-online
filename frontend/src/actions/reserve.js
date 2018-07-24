import * as types from './../constants/ActionType';

export const bookingTicket = (schedule_id, category_schedule_id, quantity, startDate) => {
    return {
        type : types.BOOKING_TICKET,
        schedule_id,
        category_schedule_id, 
        quantity, 
        startDate
    }
}

export const addSeat = (seat) => {
    return {
        type : types.ADD_SEAT,
        seat
    }
}

export const removeSeat = (seat) => {
    return {
        type : types.REMOVE_SEAT,
        seat
    }
}

export const clearSeat = () => {
    return {
        type : types.CLEAR_SEAT
    }
}

export const changeScheduleDetail = (schedule_detail_id) => {
    return {
        type : types.CHANGE_SCHEDULE_DETAIL,
        schedule_detail_id
    }
}

export const showNotice = () => {
    return {
        type : types.SHOW_NOTICE,
    }
}

export const hideNotice = () => {
    return {
        type : types.CLEAR_NOTICE
    }
}
