import React, { useMemo, useContext, useCallback } from "react";

// storage middleware
import useImageSourceWithStorage from "../middleware/useImageSourceWithStorage";

// Reducer
const initialState = {
  activeIndex: "0",
  activeId: "",
  imageSources: [],
  activeSource: {},
  selectedSourceIds: [],
  selectedSources: [],
  selectedImageRefreshInterval: 0.14 * 60e3,
  imageRefreshIntervalOptions: [0.14 * 60e3, 20 * 60e3, 60 * 60e3]
};

const updateSelectedSourceIds = ({ state, action, isRemove = false }) => {
  let selectedSourceIds;

  if (isRemove) {
    selectedSourceIds = state.selectedSourceIds.filter(id => id !== action.id);
  } else {
    selectedSourceIds = !state.selectedSourceIds.includes(action.id) && [
      ...state.selectedSourceIds,
      action.id
    ];
  }

  const selectedSources = state.imageSources.filter(({ id }) =>
    selectedSourceIds.includes(id)
  );
  return {
    selectedSourceIds,
    selectedSources
  };
};

function reducer(state, action) {
  const { type = "" } = action;
  switch (type) {
    case "SET_ACTIVE_INDEX":
      return { ...state, activeIndex: action.index };

    case "SET_ACTIVE_ID":
      return {
        ...state,
        activeId: action.id,
        activeSource: state.imageSources.filter(({ id }) => id === action.id)[0]
      };

    case "ADD_SELECTED_SOURCE_IDS":
      return {
        ...state,
        ...updateSelectedSourceIds({ state, action })
      };

    case "REMOVE_SELECTED_SOURCE_ID":
      return {
        ...state,
        ...updateSelectedSourceIds({ state, action, isRemove: true })
      };

    case "SET_STATE":
      return { ...state, ...action.state };

    case "SET_SELECTED_IMAGE_REFRESH_INTERVAL":
      return {
        ...state,
        selectedImageRefreshInterval: action.selectedImageRefreshInterval
      };

    default:
      throw new Error();
  }
}

// Provider
const ImageSourceContext = React.createContext();
function ImageSourceProvider(props) {
  const [state, dispatch] = useImageSourceWithStorage(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);
  return <ImageSourceContext.Provider value={value} {...props} />;
}

// Hook
function useImageSource() {
  const context = useContext(ImageSourceContext);
  if (!context) {
    throw new Error(`useImageSource must be used within a ImageSourceContext`);
  }
  const [state, dispatch] = context;

  const setActiveIndex = useCallback(
    index => dispatch({ type: "SET_ACTIVE_INDEX", index }),
    [dispatch]
  );

  const setActiveId = useCallback(
    id => dispatch({ type: "SET_ACTIVE_ID", id }),
    [dispatch]
  );

  const addSelectedSourceIds = useCallback(
    id => dispatch({ type: "ADD_SELECTED_SOURCE_IDS", id }),
    [dispatch]
  );

  const removeSelectedSourceIds = useCallback(
    id => dispatch({ type: "REMOVE_SELECTED_SOURCE_ID", id }),
    [dispatch]
  );

  const setState = useCallback(
    state => dispatch({ type: "SET_STATE", state }),
    [dispatch]
  );

  const setSelectedImageRefreshInterval = useCallback(
    selectedImageRefreshInterval =>
      dispatch({
        type: "SET_SELECTED_IMAGE_REFRESH_INTERVAL",
        selectedImageRefreshInterval
      }),
    [dispatch]
  );

  return {
    state,
    dispatch,
    setActiveIndex,
    setActiveId,
    addSelectedSourceIds,
    removeSelectedSourceIds,
    setState,
    setSelectedImageRefreshInterval
  };
}

export { ImageSourceProvider, useImageSource };
