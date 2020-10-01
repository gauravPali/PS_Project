import { combineReducers } from "redux";
import { login } from "./loginReducer";
import { signUp } from "./signUpReducer";

export const appReducer = combineReducers({ login, signUp });
