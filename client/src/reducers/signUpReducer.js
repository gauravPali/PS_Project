import {
    SIGNUP_BY_EMAIL_STARTED,
    SIGNUP_BY_EMAIL_FAIL,
    SIGNUP_BY_EMAIL_SUCCESS,
} from '../constants/actionTypes';

const initalState = {};

export const signUp = (state = initalState, action) => {
    switch (action.type) {
        case SIGNUP_BY_EMAIL_STARTED:
            return {

            }
        case SIGNUP_BY_EMAIL_FAIL:
            return {

            }
        case SIGNUP_BY_EMAIL_SUCCESS:
            return {

            }
        default:
            return state;
    }
}