import {
    LOGIN_BY_EMAIL_STARTED,
    LOGIN_BY_EMAIL_SUCCESS,
    LOGIN_BY_EMAIL_FAIL
} from "../constants/actionTypes";

const initalState = {
    isLoading: false,
    errors: null,
};

export const login = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN_BY_EMAIL_STARTED:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_BY_EMAIL_FAIL:
            return {
                ...state,
                isLoading: false,
                status: action.payload.status,
                errors: action.payload.errors
            }
        case LOGIN_BY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                status: action.payload.status,
                errors: action.payload.errors
            }
        default:
            return state;
    }
}