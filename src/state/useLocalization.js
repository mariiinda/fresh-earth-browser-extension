// Provider
import React, { useMemo, useContext } from "react";

// middleware
import useLocalizationWithStorage from "../middleware/useLocalizationWithStorage";

const CopyContext = React.createContext();

const initialState = {
  language: "",
  copy: {}
};

function reducer(state, action) {
  const { type = "" } = action;
  switch (type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.language };

    case "SET_COPY":
      return { ...state, copy: action.copy };

    default:
      throw new Error();
  }
}

function CopyProvider(props) {
  const [state, dispatch] = useLocalizationWithStorage(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);
  return <CopyContext.Provider value={value} {...props} />;
}

// Hook
function useLocalization() {
  const context = useContext(CopyContext);
  if (!context) {
    throw new Error(
      `useLocalization must be used within a CopyContext Provider`
    );
  }
  const [state, dispatch] = context;

  const setLanguage = language => {
    dispatch({ type: "SET_LANGUAGE", language });
  };
  const setCopy = copy => {
    dispatch({ type: "SET_COPY", copy });
  };

  return {
    state,
    dispatch,
    setLanguage,
    setCopy
  };
}

export { CopyProvider, useLocalization };
