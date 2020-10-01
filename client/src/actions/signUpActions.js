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

const signupFail = () => {
    return {
        type: SIGNUP_BY_EMAIL_FAIL,
    }
}

const signupSuccess = () => {
    return {
        type: SIGNUP_BY_EMAIL_SUCCESS
    }
}

export const signUpWithEmail = () => {
    const succ = false;
    dispatch(signupStarted());
    // async work 
    if (succ) {
        dispatch(signupSuccess());
    } else {
        dispatch(signupFail());
    }

}