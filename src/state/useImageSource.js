import React, { useMemo, useContext } from "react";

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
  refreshDate: null,
  hasImageLoadError: false,
  isImageLoading: false,
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

    case "ADD_SELECTED_SOURCE_ID":
      return {
        ...state,
        ...updateSelectedSourceIds({ state, action })
      };

    case "REMOVE_SELECTED_SOURCE_ID":
      return {
        ...state,
        ...updateSelectedSourceIds({ state, action, isRemove: true })
      };

    case "SET_REFRESH_DATE":
      return { ...state, refreshDate: action.refreshDate };

    case "SET_STATE":
      return { ...state, ...action.state };

    case "SET_IMAGE_LOAD_ERROR":
      return { ...state, hasImageLoadError: action.hasImageLoadError };

    case "SET_IS_IMAGE_LOADING":
      return { ...state, isImageLoading: action.isImageLoading };

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
  const setActiveIndex = index => dispatch({ type: "SET_ACTIVE_INDEX", index });

  const setActiveId = id => {
    return dispatch({ type: "SET_ACTIVE_ID", id });
  };

  const addSelectedSourceIds = id => {
    return dispatch({ type: "ADD_SELECTED_SOURCE_ID", id });
  };

  const removeSelectedSourceIds = id => {
    dispatch({ type: "REMOVE_SELECTED_SOURCE_ID", id });
  };

  const setRefreshDate = refreshDate =>
    dispatch({ type: "SET_REFRESH_DATE", refreshDate });

  const setState = state => dispatch({ type: "SET_STATE", state });

  const setImageLoadError = hasImageLoadError => {
    dispatch({ type: "SET_IMAGE_LOAD_ERROR", hasImageLoadError });
  };

  const setIsImageLoading = isImageLoading => {
    dispatch({ type: "SET_IS_IMAGE_LOADING", isImageLoading });
  };

  const setSelectedImageRefreshInterval = selectedImageRefreshInterval => {
    dispatch({
      type: "SET_SELECTED_IMAGE_REFRESH_INTERVAL",
      selectedImageRefreshInterval
    });
  };

  return {
    state,
    dispatch,
    setActiveIndex,
    setActiveId,
    addSelectedSourceIds,
    removeSelectedSourceIds,
    setRefreshDate,
    setState,
    setImageLoadError,
    setSelectedImageRefreshInterval,
    setIsImageLoading
  };
}

export { ImageSourceProvider, useImageSource };
