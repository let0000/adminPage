import { combineReducers } from "redux";
import admin from "./admin_reducer";

const rootReducer = combineReducers({
  admin,
});

export default rootReducer;
