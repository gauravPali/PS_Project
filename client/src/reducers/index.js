import { combineReducers } from "redux";
import { auth } from "./authReducer"

export const appReducer = combineReducers({ auth });
