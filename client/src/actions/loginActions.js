import {
    LOGIN_BY_EMAIL_STARTED,
    LOGIN_BY_EMAIL_SUCCESS,
    LOGIN_BY_EMAIL_FAIL
} from "../constants/actionTypes";

const loginStarted = () => {
    return {
        type: LOGIN_BY_EMAIL_STARTED
    }
}

const loginFail = () => {
    return {
        type: LOGIN_BY_EMAIL_FAIL,
    }
}

const loginSuccess = () => {
    return {
        type: LOGIN_BY_EMAIL_SUCCESS
    }
}

export const loginWithEmail = () => {
    const succ = false;
    dispatch(loginStarted());
    // async work 
    if (succ) {
        dispatch(loginSuccess());
    } else {
        dispatch(loginFail());
    }

}