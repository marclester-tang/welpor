import { combineReducers } from "redux";
import catReducer from './cat.reducer'

const rootReducer = combineReducers({
    cat: catReducer,
});

export default rootReducer;
