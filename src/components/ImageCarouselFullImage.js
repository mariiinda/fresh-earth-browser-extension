/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";

import useImageLoad from "../hooks/useImageLoad";
import { useNotifications } from "../state/useNotifications";

// CSS
const componentStyle = ({ isActive = false, adjustHeight = false }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${adjustHeight ? "calc(100% + 30px)" : "100%"};
  z-index: ${isActive ? "var(--middle-z-index)" : "var(--bottom-z-index)"};
  background: var(--main-bg-color);
  opacity: ${isActive ? 1 : 0};
  transition: opacity 2s 0.05s ease-in-out;
  will-change: opacity;
`;

const componentWrapperStyle = ({ isFullDisk = false }) => css`
  position: absolute;
  top: ${isFullDisk ? "calc(5% - 10px)" : "0"};
  left: ${isFullDisk ? "5%" : "0"};
  width: ${isFullDisk ? "90%" : "100%"};
  height: ${isFullDisk ? "90%" : "100%"};
`;

const imgWrapperStyle = ({ isVisible = false }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${isVisible ? 1 : 0};
  transition: opacity 2s 0.05s ease-in-out;
  will-change: opacity;
`;

const imageStyle = ({ isFullDisk = false }) => css`
  width: 100%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
`;

const maskStyle = ({ isFullDisk = false }) => css`
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 100%;
  outline: 40px solid var(--main-bg-color);
  display: ${isFullDisk ? "block" : "none"};

  > svg {
    width: 100%;
    height: 100%;
    fill: var(--main-bg-color);
  }
`;

function ImageCarouselFullImage({
  label = "",
  placeholder = "",
  src = "",
  isActive = false,
  setReadyToUpdate
}) {
  const [bottomImgSrc, setBottomImgSrc] = useState("");
  const [topImgSrc, setTopImgSrc] = useState("");
  const [bottomImageLoaded, setBottomImageLoaded] = useState(false);
  const [bottomImageVisible, setBottomImageVisible] = useState(false);
  const [topImageVisible, setTopImageVisible] = useState(false);
  const [isLoaded] = useImageLoad({ isActive, src });

  const {
    state: { isPending },
    setIsPending
  } = useNotifications();

  // fade in placeholder image
  useEffect(() => {
    if (isActive && placeholder !== "") {
      setReadyToUpdate(false);

      setBottomImgSrc(placeholder);
    }
  }, [isActive, placeholder, setReadyToUpdate, setIsPending]);

  // fade in top image
  useEffect(() => {
    if (bottomImageVisible && isLoaded) {
      setTopImgSrc(src);
    }
  }, [src, bottomImageVisible, isLoaded, setTopImgSrc]);

  // reset
  useEffect(() => {
    if (!isActive && bottomImgSrc !== "" && !isPending) {
      setBottomImageVisible(false);
      setBottomImgSrc("");
      setBottomImageLoaded(false);
      setTopImageVisible(false);
      setTopImgSrc("");
    }
  }, [isActive, bottomImgSrc, isPending]);

  // schedule update
  useEffect(() => {
    if (topImageVisible) {
      setIsPending(false);

      setReadyToUpdate(true);
    }
  }, [topImageVisible, setReadyToUpdate, setIsPending]);

  const isFullDisk = label.includes("Full Disk");
  const isGoesEastFullDisk = label.includes("GOES East Full Disk");
  const adjustHeight =
    label.includes("Northern South America") ||
    label.includes("Tropical Atlantic") ||
    label.includes("Southern South America");

  return (
    <div css={componentStyle({ isActive, adjustHeight })}>
      <div css={componentWrapperStyle({ isFullDisk })}>
        <div
          css={imgWrapperStyle({
            isVisible: bottomImageLoaded
          })}
          onTransitionEnd={({ target }) => {
            const { opacity } = getComputedStyle(target);
            if (opacity === "1") {
              setBottomImageVisible(true);
            }
            if (opacity === "0") {
              setBottomImageVisible(false);
            }
          }}
        >
          <img
            onLoad={({ target }) => {
              setBottomImageLoaded(true);
            }}
            css={imageStyle({ isFullDisk })}
            src={bottomImgSrc}
            alt=""
          />
        </div>
        <div
          css={imgWrapperStyle({
            isVisible: bottomImageVisible && isLoaded
          })}
          onTransitionEnd={({ target }) => {
            const { opacity } = getComputedStyle(target);
            if (opacity === "1") {
              setTopImageVisible(true);
            }
            if (opacity === "0") {
              setTopImageVisible(false);
            }
          }}
        >
          <img css={imageStyle({ isFullDisk })} src={topImgSrc} alt="" />
        </div>
        <div css={maskStyle({ isFullDisk, isGoesEastFullDisk })}>
          <svg viewBox="100 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0h400v200H0V0zm200 200c-55.228 0-100-44.772-100-100S144.772 0 200 0s100 44.772 100 100-44.772 100-100 100zM0 200h400v20H0v-20z"
              fill="inherit"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ImageCarouselFullImage;
