/** @jsx jsx */
import { useState, useEffect, useCallback } from "react";
import { jsx, css } from "@emotion/core";

import FullImage from "./FullImage";
// data
import imageSourcesData from "../../data/imageSources.json";
// state
import { useImageSource } from "../../state/useImageSource";
// utils
import StorageWrapper from "../../storage/storageWrapper";
import Pagination from "./Pagination";

// CSS
const componentStyle = ({ isMenuOpen = false }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: ${isMenuOpen ? "blur(7px)" : "none"};
  transition: filter 1s 0.75s ease-in-out;
  will-change: auto;
`;

function ImageCarousel({ isMenuOpen = false, closeMenu }) {
  const [readyToUpdate, setReadyToUpdate] = useState(false);
  const {
    state: {
      imageSources = [],
      selectedSources = [],
      activeSource = {},
      activeIndex = 0,
      activeId = "",
      selectedSourceIds = [],
      selectedImageRefreshInterval
    },
    setState,
    setActiveIndex,
    setActiveId
  } = useImageSource();

  const setActiveImage = useCallback(
    nextActiveIndex => {
      const nextActiveId = selectedSources[nextActiveIndex].id;
      setActiveIndex(nextActiveIndex);
      setActiveId(nextActiveId);
    },
    [setActiveIndex, setActiveId, selectedSources]
  );

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
        nextState = { ...imageSourceState };
      }
      setState(nextState);
    }
    if (imageSources.length === 0) {
      fetchState();
    }
  }, [imageSources, setState]);

  // if selected sources change, reset active image
  useEffect(() => {
    if (selectedSourceIds.length > 0 && !selectedSourceIds.includes(activeId)) {
      setActiveImage(0);
    }
  }, [selectedSourceIds, activeId, setActiveImage]);

  // refresh timer
  useEffect(() => {
    let timer = null;
    if (readyToUpdate) {
      //console.log("ready to update, setting timer");
      timer = setTimeout(() => {
        //console.log("update timer running");
        const nextActiveIndex =
          activeIndex + 1 > selectedSources.length - 1 ? 0 : activeIndex + 1;
        setActiveImage(nextActiveIndex);
      }, selectedImageRefreshInterval);
    }
    return () => {
      //console.log("cleaning up timer");
      clearTimeout(timer);
    };
  }, [
    readyToUpdate,
    selectedImageRefreshInterval,
    activeIndex,
    selectedSources,
    setActiveImage
  ]);

  const onPaginationClick = index => {
    setActiveImage(index);
  };

  return (
    <div css={componentStyle({ isMenuOpen })} onClick={closeMenu}>
      {selectedSources.length > 0 &&
        selectedSources.map(({ id, label, placeholder, src }, index) => {
          const isActive = activeSource.id === id;
          //console.log({ activeIndex, index });
          return (
            <FullImage
              key={id}
              label={label}
              placeholder={placeholder}
              src={src}
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
