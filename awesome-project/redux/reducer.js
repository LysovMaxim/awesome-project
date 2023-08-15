import { authReducer } from "./sliceAuth";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  auth: authReducer,
});
