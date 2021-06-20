import * as constants from "./constants";

export const incrementBreakLength = () => {
  return {
    type: constants.INCREMENT_BREAK_LENGTH,
  };
};

export const decrementBreakLength = () => {
  return {
    type: constants.DECREMENT_BREAK_LENGTH,
  };
};

export const incrementSessionLength = () => {
  return {
    type: constants.INCREMENT_SESSION_LENGTH,
  };
};

export const decrementSessionLength = () => {
  return {
    type: constants.DECREMENT_SESSION_LENGTH,
  };
};

export const sessionLengthChanged = () => (dispatch, getState) => {
  dispatch({
    type: constants.SESSION_LENGTH_CHANGED,
    payload: getState().sessionLength,
  });
};

export const breakLengthChanged = () => (dispatch, getState) => {
  dispatch({
    type: constants.BREAK_LENGTH_CHANGED,
    payload: getState().breakLength,
  });
};

export const decrementSessionTimer = () => {
  return {
    type: constants.DECREMENT_SESSION_TIMER,
  };
};

export const decrementBreakTimer = () => {
  return {
    type: constants.DECREMENT_BREAK_TIMER,
  };
};

export const sessionCompleted = () => (dispatch, getState) => {
  dispatch({
    type: constants.SESSION_COMPLETED,
    payload: getState().sessionLength,
  });
};

export const breakCompleted = () => (dispatch, getState) => {
  dispatch({
    type: constants.BREAK_COMPLETED,
    payload: getState().breakLength,
  });
};

export const resetEverything = () => {
  return {
    type: constants.RESET,
  };
};
