import {
    LOGIN_BY_EMAIL_STARTED,
    LOGIN_BY_EMAIL_SUCCESS,
    LOGIN_BY_EMAIL_FAIL
} from "../constants/actionTypes";

const initalState = {};

export const login = (state = initalState, action) => {
    switch (action.type) {
        case LOGIN_BY_EMAIL_STARTED:
            return {

            }
        case LOGIN_BY_EMAIL_FAIL:
            return {

            }
        case LOGIN_BY_EMAIL_SUCCESS:
            return {

            }
        default:
            return state;
    }
}