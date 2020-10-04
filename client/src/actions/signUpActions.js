import { signUpAPI } from '../httpService';
import { signUpValidator } from '../components/authorization/validators';

import {
    SIGNUP_BY_EMAIL_STARTED,
    SIGNUP_BY_EMAIL_FAIL,
    SIGNUP_BY_EMAIL_SUCCESS,
} from "../constants/actionTypes";

// abosrtEarly:true did not give all validator results (only first error)
export const validateForm = (data) => dispatch => {
    dispatch(signupStarted());
    signUpValidator.validate(data, { abortEarly: false })
        .then(res => {
            console.log(res);
            dispatch(signUpWithEmail(data));
        })
        .catch(err => {
            console.log(err);
            let fieldErrors = {
                messages: []
            };
            err.inner.forEach(({ path, errors }, index) => {
                fieldErrors[path] = true;
                // only single error fetched
                if (index === 0 || path !== err.inner[index - 1].path) {
                    fieldErrors.messages.push(errors[0]);
                }
            })
            dispatch(signupFail({ status: false, errors: fieldErrors }));
        })
}

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

const signupSuccess = (payload) => {
    return {
        type: SIGNUP_BY_EMAIL_SUCCESS,
        payload
    }
}

const signUpWithEmail = (formData) => dispatch => {
    dispatch(signupStarted());
    signUpAPI(formData)
        .then(res => {
            debugger
            console.log('pali');
            const { status, errors } = res.data;
            console.log(res);
            dispatch(signupSuccess({ status, errors }));
        })
        .catch(err => {
            debugger
            console.log('pali 1');
            console.dir(err);
            const { status, errors } = err.response.data;
            console.log(err.response.data.status);
            console.log(err.response.data.messege);
            dispatch(signupFail({ status, errors }));
        })
}