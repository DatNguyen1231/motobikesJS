import { combineReducers } from "redux";
import registerReducer from "./action/index"

const rootReducer = combineReducers({
    register: registerReducer,
});
export default rootReducer;