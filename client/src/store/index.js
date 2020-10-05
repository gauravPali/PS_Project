import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { appReducer } from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools();
const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;   