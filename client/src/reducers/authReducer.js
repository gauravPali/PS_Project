import {
    SIGNUP_BY_EMAIL_STARTED,
    SIGNUP_BY_EMAIL_FAIL,
    SIGNUP_BY_EMAIL_SUCCESS,
    LOGIN_BY_EMAIL_STARTED,
    LOGIN_BY_EMAIL_SUCCESS,
    LOGIN_BY_EMAIL_FAIL,
    REMOVE_ERROS_ON_TAB_CHANGE,
    USER_LOADING,
    USER_FAIL,
    USER_LOADED,
    LOG_OUT
} from '../constants/actionTypes';

const initalState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    signUpErrors: null,
    loginErrors: null,
    isAuth: false,
    tokenError: null,
};

export const auth = (state = initalState, action) => {
    console.log(`%c${action.type}`, `color: brown; font-weight: bold; font-size: 15px;`);
    switch (action.type) {
        case SIGNUP_BY_EMAIL_STARTED:
        case LOGIN_BY_EMAIL_STARTED:
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SIGNUP_BY_EMAIL_FAIL:
            return {
                ...state,
                isLoading: false,
                status: action.payload.status,
                signUpErrors: action.payload.errors
            }
        case SIGNUP_BY_EMAIL_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                status: action.payload.status,
                signUpErrors: action.payload.errors,
                user: action.payload.user,
                token: action.payload.token,
                tokenError: null
            }
        case LOGIN_BY_EMAIL_FAIL:
            return {
                ...state,
                isLoading: false,
                status: action.payload.status,
                loginErrors: action.payload.errors
            }
        case LOGIN_BY_EMAIL_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoading: false,
                isAuth:true,
                status: action.payload.status,
                loginErrors: action.payload.errors,
                user: action.payload.user,
                token: action.payload.token,
                tokenError: null
            }
        case REMOVE_ERROS_ON_TAB_CHANGE:
            return {
                ...state,
                [action.payload + 'Errors']: null
            }
        case USER_FAIL:
            return {
                ...state,
                isLoading: false,
                status: action.payload.status,
                tokenError: action.payload.error,
                isAuth: false
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                status: action.payload.status,
                user: action.payload.user,
                isAuth: true,
                tokenError: null
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                status: true,
                user: null,
                isAuth: false,
                tokenError: null
            }
        default:
            return state;
    }
}