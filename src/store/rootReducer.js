import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import notificationReducer from "./reducers/notificationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
});
export default rootReducer;
