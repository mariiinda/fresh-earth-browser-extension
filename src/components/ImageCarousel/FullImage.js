/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
//import posed from "react-pose";

// CSS
const componentStyle = css`
  ${"" /* position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */}
  width: 100%;
  height: 200px;
  position: relative;
  border: 1px solid red;
  display: flex;
`;

const placeholderStyle = ({ isFullDisk = false }) => css`
  width: 50%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
`;

const imageStyle = ({ isFullDisk = false }) => css`
  width: 50%;
  height: 100%;
  object-fit: ${isFullDisk ? "contain" : "cover"};
  ${"" /* display: none; */}
`;

function Component({ label = "", placeholder = "", src = "" }) {
  const isFullDisk = label.includes("Full Disk");
  const isGoesEastFullDisk = label.includes("GOES East Full Disk");
  console.log({ isFullDisk, isGoesEastFullDisk });

  return (
    <div css={componentStyle}>
      <img css={placeholderStyle({ isFullDisk })} src={placeholder} alt="" />
      <img css={imageStyle({ isFullDisk })} src={src} alt={label} />
    </div>
  );
}

export default Component;
