/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
//import posed from "react-pose";

import FullImage from "./FullImage";
// data
import imageSourcesData from "../../data/imageSources.json";
// state
import { useImageSource } from "../../state/useImageSource";
// utils
import StorageWrapper from "../../storage/storageWrapper";
import Pagination from "./Pagination";

// CSS
const componentStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

function ImageCarousel({ isMenuOpen = false, closeMenu }) {
  const [readyToUpdate, setReadyToUpdate] = useState(false);
  const {
    state: {
      imageSources = [],
      selectedSources = [],
      activeSource = {},
      activeIndex = 0,
      selectedImageRefreshInterval
    },
    setState,
    setActiveIndex,
    setActiveId
  } = useImageSource();

  // set initial image source state
  useEffect(() => {
    async function fetchState() {
      let nextState = {};
      const imageSourceState = await StorageWrapper.get("imageSourceState");
      if (!imageSourceState) {
        const defaultIndex = 0;
        const defaultId = imageSourcesData[defaultIndex].id;
        const activeSource = imageSourcesData.filter(
          ({ id }) => id === defaultId
        )[0];
        nextState = {
          activeIndex: defaultIndex,
          activeId: defaultId,
          imageSources: imageSourcesData,
          activeSource,
          selectedSourceIds: imageSourcesData.map(({ id }) => id),
          selectedSources: imageSourcesData
        };
      } else {
        nextState = { ...imageSourceState, isImageLoading: false };
      }
      setState(nextState);
    }
    if (imageSources.length === 0) {
      fetchState();
    }
  }, [imageSources, setState]);

  const setActiveImage = nextActiveIndex => {
    const nextActiveId = selectedSources[nextActiveIndex].id;
    console.log({ nextActiveIndex, nextActiveId });
    setActiveIndex(nextActiveIndex);
    setActiveId(nextActiveId);
  };

  useEffect(() => {
    let timer = null;
    if (readyToUpdate) {
      timer = setTimeout(() => {
        console.log("update timer running");
        const nextActiveIndex =
          activeIndex + 1 > selectedSources.length - 1 ? 0 : activeIndex + 1;
        setActiveImage(nextActiveIndex);
        /* const nextActiveId = selectedSources[nextActiveIndex].id;
        setActiveIndex(nextActiveIndex);
        setActiveId(nextActiveId); */
        //}, selectedImageRefreshInterval);
      }, 5000);
    }
    return () => {
      if (!readyToUpdate) {
        console.log("cleaning up timer");
        clearTimeout(timer);
      }
    };
  }, [readyToUpdate]);

  // Side effect: when image is ready, initiate update loop
  /*    useEffect(() => {
    let timer = null;
    if (imageReadyToReload) {
      timer = setTimeout(() => {
        const nextActiveIndex =
          activeIndex + 1 > selectedSources.length - 1 ? 0 : activeIndex + 1;
        const nextActiveId = selectedSources[nextActiveIndex].id;
        setActiveIndex(nextActiveIndex);
        setActiveId(nextActiveId);
        setCacheTimeStamp(Date.now());
      }, selectedImageRefreshInterval);
    }
    return () => {
      !imageReadyToReload && clearTimeout(timer);
    };
  }, [
    imageReadyToReload,
    activeIndex,
    selectedSources,
    setActiveIndex,
    setActiveId,
    selectedImageRefreshInterval
  ]); */

  const onPaginationClick = index => {
    //setReadyToUpdate(true);
    setActiveImage(index);
  };

  return (
    <div css={componentStyle}>
      {selectedSources.length > 0 &&
        selectedSources.map(({ id, label, placeholder, src }) => {
          const isActive = activeSource.id === id;
          return (
            <FullImage
              key={id}
              label={label}
              placeholder={placeholder}
              src={isActive ? src : ""}
              isActive={isActive}
              setReadyToUpdate={setReadyToUpdate}
            />
          );
        })}

      <Pagination
        items={selectedSources}
        activeId={activeSource.id}
        onClick={onPaginationClick}
      />
    </div>
  );
}

export default ImageCarousel;
