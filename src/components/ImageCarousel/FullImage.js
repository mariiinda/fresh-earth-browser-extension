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

const placeholderStyle = ({ isFullDisk = false }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
`;

const imageStyle = ({ isVisible = false, isFullDisk = false }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
  ${"" /* opacity: ${isVisible ? 1 : 0}; */}
  transition: opacity 2s ease-in-out;
  will-change: opacity;
`;

function FullImage({
  label = "",
  placeholder = "",
  src = "",
  isActive = false
}) {
  const [isLoaded] = useImageLoad({ src });
  //console.log({ isLoaded, src, isPending, hasError });

  //const { setIsPending, setHasError } = useNotifications();

  //useEffect(() => {
  //isPending && setIsPending(true);
  //setIsPending(isPending);
  /* if (isPending) {
      setIsPending(true);
    } else {
      setIsPending(false);
    } */
  //}, [isPending, setIsPending]);

  const isFullDisk = label.includes("Full Disk");
  //const isGoesEastFullDisk = label.includes("GOES East Full Disk");
  //console.log({ isFullDisk, isGoesEastFullDisk });

  return (
    <div css={componentStyle({ isActive })}>
      {/*  <img css={placeholderStyle({ isFullDisk })} src={placeholder} alt="" /> */}
      <img
        css={imageStyle({ isFullDisk })}
        src={isLoaded ? src : ""}
        alt={label}
      />
    </div>
  );
}

export default FullImage;
