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
} from "../constants/actionTypes";

const initalState = {
    loader: false,
    message: null,
    errors: null,
    status: null,
};

export const question = (state = initalState, action) => {
    switch (action.type) {
        case SAVE_QUESTION_STARTED:
        case QUESTIONS_FETCH_STARTED:
            return {
                ...state,
                loader: true
            }
        case SAVE_QUESTION_SUCCESS:
            return {
                ...state,
                loader: false,
                message: action.payload.message,
                errors: action.payload.errors,
                status: action.payload.status,
                id: action.payload.id
            }
        case SAVE_QUESTION_FAILED:
            return {
                ...state,
                loader: false,
                message: action.payload.message,
                errors: action.payload.errors,
                status: action.payload.status
            }
        case QUESTIONS_FETCH_FAILED: {
            return {
                ...state,
                loader: false,
                fetchError: action.payload.error,
                fetchStatus: action.payload.status,
            }
        }
        case QUESTIONS_FETCH_SUCCESS: {
            return {
                ...state,
                loader: false,
                count: action.payload.count,
                questions: action.payload.questions,
                fetchStatus: action.payload.status,
                fetchError: action.payload.error
            }
        }
        default:
            return state;
    }
}