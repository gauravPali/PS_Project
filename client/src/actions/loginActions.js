import { loginAPI } from '../httpService';
import { loginValidator } from '../components/authorization/validators';

import {
    LOGIN_BY_EMAIL_STARTED,
    LOGIN_BY_EMAIL_SUCCESS,
    LOGIN_BY_EMAIL_FAIL
} from "../constants/actionTypes";

export const validateForm = (data) => dispatch => {
    console.log(data);
    dispatch(loginStarted());
    loginValidator.validate(data, { abortEarly: false })
        .then(res => {
            console.log(res);
            dispatch(loginWithEmail(data));
        })
        .catch(err => {
            console.log(err);
            let fieldErrors = {
                messages: []
            };
            err.inner.forEach(({ path, errors }, index) => {
                fieldErrors[path] = true;
                if (index === 0 || path !== err.inner[index - 1].path) {
                    fieldErrors.messages.push(errors[0]);
                }
            })
            dispatch(loginFail({ status: false, errors: fieldErrors }));
        })
}

const loginStarted = () => {
    return {
        type: LOGIN_BY_EMAIL_STARTED
    }
}

const loginFail = (payload) => {
    return {
        type: LOGIN_BY_EMAIL_FAIL,
        payload
    }
}

const loginSuccess = (payload) => {
    return {
        type: LOGIN_BY_EMAIL_SUCCESS,
        payload
    }
}

const loginWithEmail = (formData) => dispatch => {
    dispatch(loginStarted());
    loginAPI(formData)
        .then(res => {
            console.log(res);
            const { status, errors } = res.data;
            dispatch(loginSuccess({ status, errors }));
        })
        .catch(err => {
            console.dir(err);
            const { status, errors } = err.response.data;
            console.log(err.response.data.status);
            console.log(err.response.data.messege);
            dispatch(loginFail({ status, errors }));
        })
}