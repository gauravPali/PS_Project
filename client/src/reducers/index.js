import { combineReducers } from "redux";
import { auth } from "./authReducer";
import { question } from "./questionReducers";

export const appReducer = combineReducers({ auth, question });
