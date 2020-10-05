import { auth } from '../httpService';
import { signUpValidator, loginValidator } from '../components/authorization/validators';
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
} from "../constants/actionTypes";

const validateHelper = (dispatch, validator, data, authStarted, authWithEmail, authFail) => {
    dispatch(authStarted());
    validator.validate(data, { abortEarly: false })
        .then(res => {
            console.log(res);
            dispatch(authWithEmail(data));
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
            dispatch(authFail({ status: false, errors: fieldErrors }));
        })
}

// aborttEarly:true did not give all validator results (only first error)
export const validateForm = (data, name) => dispatch => {
    console.log(`%cValidate form fired`, `color: brown; font-weight: bold; font-size: 15px;`);
    if (name === 'signUp') {
        validateHelper(dispatch, signUpValidator, data, signupStarted, signUpWithEmail, signupFail);
    } else if (name === 'login') {
        validateHelper(dispatch, loginValidator, data, loginStarted, loginWithEmail, loginFail);
    }
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
    console.log(`%cSignup WithEmail fired`, `color: brown; font-weight: bold; font-size: 15px;`);
    auth.signUpAPI(formData)
        .then(res => {
            const { status, errors, token, user } = res.data;
            dispatch(signupSuccess({ status, errors, token, user }));
        })
        .catch(err => {
            if (err.response) {
                const { status, errors } = err.response.data;
                dispatch(signupFail({ status, errors }));
            } else {
                console.log(err.message);
            }
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
    auth.loginAPI(formData)
        .then(res => {
            const { status, errors, token, user } = res.data;
            dispatch(loginSuccess({ status, errors, token, user }));
        })
        .catch(err => {
            console.dir(err);
            if (err.response) {
                const { status, errors } = err.response.data;
                console.log(err.response.data.status);
                console.log(err.response.data.messege);
                dispatch(loginFail({ status, errors }));
            } else {
                console.log(err.message);
            }
        })
}

// if on tab change previuos tab has erros remove them
// payload = tab name
export const removeErrorsOfTab = (payload) => {
    return {
        type: REMOVE_ERROS_ON_TAB_CHANGE,
        payload
    }
}

const userLoading = () => {
    return {
        type: USER_LOADING,
    }
}

const userFail = (payload) => {
    return {
        type: USER_FAIL,
        payload
    }
}

const userSuccess = (payload) => {
    return {
        type: USER_LOADED,
        payload
    }
}

// from index dispatch an action to get cuurrent user
export const getUser = () => (dispatch) => {
    console.log('i am called');
    dispatch(userLoading());
    auth.getUserAPI()
        .then(res => {
            const { status, user } = res.data;
            dispatch(userSuccess({ status, user }));
        })
        .catch(err => {
            if (err.response) {
                const { status, error } = err.response.data;
                dispatch(userFail({ status, error }));
            } else {
                console.log(err.message);
            }
        })
}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}