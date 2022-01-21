import userReducers from "../reducer/userreducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    users:userReducers
})

export default rootReducer