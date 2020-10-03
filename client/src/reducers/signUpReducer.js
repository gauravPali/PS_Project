import {
    SIGNUP_BY_EMAIL_STARTED,
    SIGNUP_BY_EMAIL_FAIL,
    SIGNUP_BY_EMAIL_SUCCESS,
} from '../constants/actionTypes';

const initalState = {
    isLoading: false,
    error: null
};

export const signUp = (state = initalState, action) => {
    console.log(action.type);
    switch (action.type) {
        case SIGNUP_BY_EMAIL_STARTED:
            return {
                ...state,
                isLoading: true
            }
        case SIGNUP_BY_EMAIL_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        case SIGNUP_BY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}