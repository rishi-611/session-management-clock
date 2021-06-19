import * as constants from "../actions/constants";
import { combineReducers } from "redux";

const breakLengthReducer = (state = 5, action) => {
  switch (action.type) {
    case constants.INCREMENT_BREAK_LENGTH:
      return state + 1;
    case constants.DECREMENT_BREAK_LENGTH:
      return state - 1;
    default:
      return state;
  }
};

const sessionLengthReducer = (state = 25, action) => {
  switch (action.type) {
    case constants.INCREMENT_SESSION_LENGTH:
      return state + 1;
    case constants.DECREMENT_SESSION_LENGTH:
      return state - 1;
    default:
      return state;
  }
};

const timeLeftReducer = (state = 1 * 10, action) => {
  switch (action.type) {
    case constants.SESSION_LENGTH_CHANGED:
      return action.payload * 60;
    case constants.DECREMENT_SESSION_TIMER:
      return state - 1;
    case constants.SESSION_COMPLETED:
      return action.payload * 60;
    default:
      return state;
  }
};

const reducers = combineReducers({
  breakLength: breakLengthReducer,
  sessionLength: sessionLengthReducer,
  timeLeft: timeLeftReducer,
});

export default reducers;
