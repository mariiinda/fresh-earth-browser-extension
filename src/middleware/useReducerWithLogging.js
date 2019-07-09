import { useReducer } from "react";

// example of logging reducer dispatches - use this instead of useReducer

// cache prev state for logging
let prevState = {};

const useReducerWithLogging = (reducer, initialState) => {
  const reducerWithLogging = (state, action) => {
    if (action.isMiddleware) {
      delete action.isMiddleware;
      console.info(`[${action.type}]`, {
        action,
        state: prevState,
        nextState: state
      });
      return state;
    } else {
      prevState = state;
    }
    return reducer(state, action);
  };
  const [state, dispatch] = useReducer(reducerWithLogging, initialState);
  const wrappedDispatch = action => {
    const firstDispatch = dispatch(action);
    dispatch({ ...action, isMiddleware: true });
    return firstDispatch;
  };
  return [state, wrappedDispatch];
};

export default useReducerWithLogging;
