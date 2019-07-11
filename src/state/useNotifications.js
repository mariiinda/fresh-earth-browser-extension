import React, { useMemo, useContext, useReducer, useCallback } from "react";

// Reducer
const initialState = {
  isLoaded: false,
  isPending: false,
  hasError: false
};
function reducer(state, action) {
  const { type = "" } = action;
  switch (type) {
    case "SET_IS_PENDING":
      return { ...state, isPending: action.isPending };

    case "SET_HAS_ERROR":
      return { ...state, hasError: action.hasError };

    default:
      throw new Error();
  }
}

// Provider
const NotificationsContext = React.createContext();
function NotificationsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);
  return <NotificationsContext.Provider value={value} {...props} />;
}

// Hook
function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      `useNotifications must be used within a NotificationsContext`
    );
  }
  const [state, dispatch] = context;
  const setHasError = hasError => dispatch({ type: "SET_HAS_ERROR", hasError });
  const setIsPending = useCallback(
    isPending => dispatch({ type: "SET_IS_PENDING", isPending }),
    [dispatch]
  );

  return {
    state,
    dispatch,
    setHasError,
    setIsPending
  };
}

export { NotificationsProvider, useNotifications };
