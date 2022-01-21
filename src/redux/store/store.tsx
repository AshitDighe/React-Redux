import { createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "../reducer/root-reducer";

const middlewares = [reduxThunk,logger]

const store = createStore(rootReducer,applyMiddleware(...middlewares))

export default store
   