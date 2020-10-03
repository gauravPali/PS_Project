import { signUpAPI } from '../httpService';
import {
    SIGNUP_BY_EMAIL_STARTED,
    SIGNUP_BY_EMAIL_FAIL,
    SIGNUP_BY_EMAIL_SUCCESS,
} from "../constants/actionTypes";

const signupStarted = () => {
    return {
        type: SIGNUP_BY_EMAIL_STARTED
    }
}

const signupFail = (payload) => {
    return {
        type: SIGNUP_BY_EMAIL_FAIL,
        payload
    }
}

const signupSuccess = () => {
    return {
        type: SIGNUP_BY_EMAIL_SUCCESS
    }
}


export const signUpWithEmail = (formData) => dispatch => {
    dispatch(signupStarted());
    signUpAPI(formData)
        .then(res => {
            console.log(res);
            dispatch(signupSuccess());
        })
        .catch(err => {
            console.log(err.response.data.status);
            console.log(err.response.data.messege);
            dispatch(signupFail(err.response.data));
        })
}