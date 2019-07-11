/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
//import posed from "react-pose";

import useImageLoad from "./useImageLoad";
//import { useNotifications } from "../../state/useNotifications";

// CSS
const componentStyle = ({ isActive }) => css`
  position: relative;
  border: ${isActive ? "1px solid red" : "transparent"};
`;

/* const placeholderStyle = ({ isFullDisk = false }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
`; */

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

function FullImage({
  label = "",
  placeholder = "",
  src = "",
  isActive = false,
  setReadyToUpdate
}) {
  const [iLoaded] = useImageLoad({ src });
  const [bottomImageLoaded, setBottomImageLoaded] = useState(false);
  const [bottomImageVisible, setBottomImageVisible] = useState(false);
  const [topImageVisible, setTopImageVisible] = useState(false);

  useEffect(() => {
    if (topImageVisible) {
      console.log("Set timer - ready to update");
      setReadyToUpdate(true);
    }
  }, [topImageVisible]);

  const isFullDisk = label.includes("Full Disk");
  //const isGoesEastFullDisk = label.includes("GOES East Full Disk");
  //console.log({ isFullDisk, isGoesEastFullDisk });

  return (
    <div css={componentStyle({ isActive })}>
      <div
        css={imgWrapperStyle({ isVisible: bottomImageLoaded && isActive })}
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
            setBottomImageLoaded(true);
          }}
          css={imageStyle({ isFullDisk })}
          src={placeholder}
          alt=""
        />
      </div>
      <div
        css={imgWrapperStyle({ isVisible: bottomImageVisible })}
        onTransitionEnd={({ target }) => {
          const { opacity } = getComputedStyle(target);
          if (opacity === "1") {
            console.log("top img visible");
            setTopImageVisible(true);
          }
          if (opacity === "0") {
            console.log("top img hidden");
            setTopImageVisible(false);
          }
        }}
      >
        <img
          /*onLoad={() => {
            console.log("loading dom image done");
          }}*/
          css={imageStyle({ isFullDisk })}
          src={iLoaded ? src : ""}
          alt={label}
        />
      </div>
    </div>
  );
}

export default FullImage;
