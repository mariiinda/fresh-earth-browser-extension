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
  const {
    state: { imageSources = [], selectedSources = [], activeSource = {} },
    setState
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
            />
          );
        })}
    </div>
  );
}

export default ImageCarousel;
