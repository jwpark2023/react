import { combineReducers } from "redux";
import menuSagaReducer from "./menuReducer";

const rootReducer = combineReducers({
  menuSagaReducer,
});

export default rootReducer;
