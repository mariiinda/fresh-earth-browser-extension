import { useReducer } from "react";
import equal from "fast-deep-equal";

import StorageWrapper from "../storage/storageWrapper";

const loadCopy = ({ language }) => {
  return new Promise((resolve, reject) => {
    import(`../data/copy/${language}`)
      .then(({ copy }) => {
        resolve(copy);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// cache prev state
let prevState = {};

const useLocalizationWithStorage = (reducer, initialState) => {
  const reducerWithStorage = (state, action) => {
    if (action.isMiddleware) {
      if (!equal(prevState, state)) {
        delete action.isMiddleware;

        StorageWrapper.get("localizationState").then(
          async localizationState => {
            if (action.type === "SET_LANGUAGE") {
              const { language } = state;
              StorageWrapper.set("localizationState", { language });
              const copy = await loadCopy({ language });
              dispatch({ type: "SET_COPY", copy });
            }
          }
        );

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
  const wrappedDispatch = async action => {
    const firstDispatch = dispatch(action);
    dispatch({ ...action, isMiddleware: true });
    return firstDispatch;
  };
  return [state, wrappedDispatch];
};

export default useLocalizationWithStorage;
