import * as types from './../constants/ActionType';

export const userFetchInformation = (name, email, phone) => {
    return {
        type : types.USER_FETCH,
        name,
        email, 
        phone
    }
}

export const userRegister = (name, email, password,phone) => {
    return {
        type : types.USER_REGISTER,
        name,
        email,
        password, 
        phone
    }
}

export const signOut = () => {
    return {
        type : types.SIGN_OUT
    }
}

export const fetchToken = (token) => {
    return {
        type : types.FETCH_TOKEN,
        token
    }
}

