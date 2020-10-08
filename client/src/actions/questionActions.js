import { question } from '.././httpService';
import { validator } from '../components/questions/validator';
import {
    SAVE_QUESTION_STARTED,
    SAVE_QUESTION_SUCCESS,
    SAVE_QUESTION_FAILED,
    QUESTIONS_FETCH_STARTED,
    QUESTIONS_FETCH_SUCCESS,
    QUESTIONS_FETCH_FAILED,
    QUESTION_TOGGLE_STARTED,
    QUESTION_TOGGLE_SUCCESS,
    QUESTION_TOGGLE_FAILED,
    CLEAR_QUESTION_TOGGLE_DATA
} from "../constants/actionTypes";

export const validateQuesData = (data) => dispatch => {
    console.log(`%c${JSON.stringify(data)}`, `color:red`);
    dispatch(questionSaving());
    validator.validate(data, { abortEarly: false })
        .then(res => {
            dispatch(saveQuestion(data));
        })
        .catch(err => {
            let errors = {};
            // from inner object meessage is destructured instead of errors:[]
            err.inner.forEach(({ path, message }) => {
                if (!errors[path]) {
                    errors[path] = message;
                }
            })
            dispatch(questionSaveFailed({ message: 'Validation Failed', errors, status: false }));
        })
}

const questionSaving = () => {
    return {
        type: SAVE_QUESTION_STARTED
    }
}

const questionSaveSuccess = (payload) => {
    return {
        type: SAVE_QUESTION_SUCCESS,
        payload
    }
}

const questionSaveFailed = (payload) => {
    return {
        type: SAVE_QUESTION_FAILED,
        payload
    }
}

const saveQuestion = (data) => dispatch => {
    question.saveQuestion(data)
        .then(res => {
            const { status, errors, message, id } = res.data;
            dispatch(questionSaveSuccess({ errors, message, status, id }));
        })
        .catch(err => {
            if (err.response) {
                console.dir(err);
                const { errors, message, status, id } = err.response.data;
                dispatch(questionSaveFailed({ errors, message, status, id }));
            } else {
                dispatch(questionSaveFailed({ status: 'false', errors: null, message: err.message }));
            }
        })
}

const getQuestionsStarted = () => {
    return {
        type: QUESTIONS_FETCH_STARTED
    }
}

const getQuestionsSuccess = (payload) => {
    return {
        type: QUESTIONS_FETCH_SUCCESS,
        payload
    }
}

const getQuestionsFailed = (payload) => {
    return {
        type: QUESTIONS_FETCH_FAILED,
        payload
    }
}

export const getQuestions = (pageNo) => dispatch => {
    dispatch(getQuestionsStarted());
    question.getQuestionsByOffset(pageNo)
        .then(res => {
            const { count, questions, status, error } = res.data;
            dispatch(getQuestionsSuccess({ count, questions, status, error }));
        })
        .catch(err => {
            if (err.response) {
                const { error, status } = err.response.data;
                dispatch(getQuestionsFailed({ error, status }));
            } else {
                dispatch(getQuestionsFailed({ error: err.message }));
            }
        })
}


const toggleQuestionStarted = (payload) => {
    return {
        type: QUESTION_TOGGLE_STARTED,
        payload
    }
}

const toggleQuestionSuccess = (payload) => {
    return {
        type: QUESTION_TOGGLE_SUCCESS,
        payload
    }
}

const toggleQuestionFailed = (payload) => {
    return {
        type: QUESTION_TOGGLE_FAILED,
        payload
    }
}

export const toggleQuestion = (ques) => dispatch => {
    // debugger
    dispatch(toggleQuestionStarted(ques.id));
    question.toggleState(ques)
        .then(res => {
            console.log(res);
            const { status, message, result, } = res.data;
            dispatch(toggleQuestionSuccess({ status, message, result, }));
        })
        .catch(err => {
            console.log(err);
            if (err.response) {
                console.log(err);
                const { status, message, result } = err.response.data;
                dispatch(toggleQuestionFailed({ status, message, result }));
            } else {
                dispatch(toggleQuestionFailed({ error: err.message }));
            }
        })
}

export const clearToggleData = () => {
    return {
        type: CLEAR_QUESTION_TOGGLE_DATA
    }
}


