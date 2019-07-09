import { useReducer } from "react";
import equal from "fast-deep-equal";

import StorageWrapper from "../storage/storageWrapper";

// cache prev state
let prevState = {};

const useImageSourceWithStorage = (reducer, initialState) => {
  const reducerWithStorage = (state, action) => {
    if (action.isMiddleware) {
      if (!equal(prevState, state)) {
        delete action.isMiddleware;

        StorageWrapper.get("imageSourceState").then(imageSourceState => {
          if (action.type === "SET_STATE") {
            if (!imageSourceState) {
              StorageWrapper.set("imageSourceState", state);
            }
          }

          if (
            action.type === "SET_ACTIVE_INDEX" ||
            action.type === "SET_IS_IMAGE_LOADING" ||
            action.type === "SET_ACTIVE_ID" ||
            action.type === "ADD_SELECTED_SOURCE_ID" ||
            action.type === "REMOVE_SELECTED_SOURCE_ID" ||
            action.type === "SET_SELECTED_IMAGE_REFRESH_INTERVAL"
          ) {
            if (imageSourceState && !equal(imageSourceState, state)) {
              StorageWrapper.set("imageSourceState", state);
            }
          }
        });

        // logging actions
        /* console.info(`[${action.type}]`, {
          action,
          state: prevState,
          nextState: state
        }); */
      }

      return state;
    } else {
      prevState = state;
    }
    return reducer(state, action);
  };
  const [state, dispatch] = useReducer(reducerWithStorage, initialState);
  const wrappedDispatch = action => {
    const firstDispatch = dispatch(action);
    dispatch({ ...action, isMiddleware: true });
    return firstDispatch;
  };
  return [state, wrappedDispatch];
};

export default useImageSourceWithStorage;
