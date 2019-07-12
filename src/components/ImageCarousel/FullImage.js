/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";

import useImageLoad from "./useImageLoad";
//import { useNotifications } from "../../state/useNotifications";

// CSS
const componentStyle = ({
  isFullDisk = false,
  isGoesEastFullDisk = false
}) => css`
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

const imageStyle = ({ isVisible = false, isFullDisk = false }) => css`
  width: 100%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
`;

const maskStyle = ({ isFullDisk = false, isGoesEastFullDisk = false }) => css`
  position: absolute;
  top: ${isGoesEastFullDisk ? "-9px" : 0};
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

function FullImage({
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

  useEffect(() => {
    if (isActive && placeholder !== "") {
      console.log("Loading bottom image");
      setBottomImgSrc(placeholder);
    }
  }, [isActive, placeholder]);

  useEffect(() => {
    if (bottomImageVisible && isLoaded) {
      console.log("Loading top image");
      setTopImgSrc(src);
    }
  }, [src, bottomImageVisible, isLoaded, setTopImgSrc]);

  /* useEffect(() => {
    if (isActive && src !=="") {
      console.log("Is active state changed to true");
      const [isLoaded] = useImageLoad({ src })
      setBottomImgSrc(placeholder);
    }
  }, [isActive, src]); */

  /*   useEffect(() => {
    if (bottomImageVisible) {
      
    }
  }, [bottomImageVisible]);
 */
  /* useEffect(() => {
    if (topImageVisible) {
      //console.log("Set timer - ready to update");
      setReadyToUpdate(true);
    }
  }, [topImageVisible, setReadyToUpdate]); */

  const isFullDisk = label.includes("Full Disk");
  const isGoesEastFullDisk = label.includes("GOES East Full Disk");

  return (
    <div css={componentStyle({ isFullDisk, isGoesEastFullDisk })}>
      <div
        css={imgWrapperStyle({
          isVisible: bottomImageLoaded
        })}
        onTransitionEnd={({ target }) => {
          const { opacity } = getComputedStyle(target);
          if (opacity === "1") {
            console.log("bottom img visible");
            setBottomImageVisible(true);
          }
          if (opacity === "0") {
            console.log("bottom img hidden");
            setBottomImageVisible(false);
          }
        }}
      >
        <img
          onLoad={() => {
            console.log("bottom image loaded");
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
            console.log("top img visible");
            setTopImageVisible(true);
          }
          if (opacity === "0") {
            //console.log("top img hidden");
            setTopImageVisible(false);
          }
        }}
      >
        <img css={imageStyle({ isFullDisk })} src={topImgSrc} alt={label} />
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
  );
}

export default FullImage;
