/** @jsx jsx */

import { useEffect, useState } from "react";
import { jsx, css } from "@emotion/core";

// CSS
const componentStyle = ({ isFullDisk = false }) => css`
  position: relative;
  width: ${isFullDisk ? "90%" : "100%"};
  height: ${isFullDisk ? "90%" : "100%"};
  ${"" /* width: 90%;
height: 90%; */}
`;

const topLayerStyle = ({ isVisible }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${isVisible ? 1 : 0};
  transition: opacity 2s ease-in-out;
  will-change: opacity;
`;

const bottomLayerStyle = ({ isVisible }) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${isVisible ? 1 : 0};
  transition: all 1s ease-in-out;
  will-change: auto;
`;

const imgStyle = ({ isFullDisk = false }) => css`
width: 100%;
height: 100%;
${"" /* object-fit: contain; */}
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

let prevTimestamp = "";

// util functions
const loadImage = ({ src, cacheTimeStamp = "", setIsImageLoading }) => {
  // this is here to prevent reloading same resource
  if (cacheTimeStamp === prevTimestamp && cacheTimeStamp !== "") {
    return new Promise(resolve => resolve(""));
  } else {
    prevTimestamp = cacheTimeStamp;
  }

  console.log("Loading image", { src, cacheTimeStamp });
  const img = new Image();
  img.src = `${src}?t=${cacheTimeStamp}`;
  //setIsImageLoading(true);
  return new Promise((resolve, reject) => {
    //setIsImageLoading(false);
    img.onload = ({ target }) => {
      resolve(target.src);
    };
    img.onerror = error => {
      //console.error({ error });
      reject(error);
    };
  });
};

function Component({
  thumb = "",
  src = "",
  alt = "",
  closeMenu,
  setReadyToReload,
  setRefreshDate,
  hasImageLoadError,
  setImageLoadError,
  isImageLoading = false,
  setIsImageLoading,
  cacheTimeStamp = ""
}) {
  const [bottomImageLoaded, setBottomImageLoaded] = useState(false);
  const [bottomImageSrc, setBottomImageSrc] = useState("");
  const [topImageLoaded, setTopImageLoaded] = useState(false);
  const [topImageSrc, setTopImageSrc] = useState("");
  const [topImageVisible, setTopImageVisible] = useState(false);

  // Effect - Step 1: initial bottom layer image load
  useEffect(() => {
    const isFirstLoad = thumb !== "" && bottomImageSrc === "";
    async function fetchImage() {
      try {
        if (isFirstLoad) {
          // console.log("Step1: initial bottom layer image load");
          const bottomSrc = await loadImage({ src: thumb });
          bottomSrc !== "" && setBottomImageSrc(bottomSrc);
          if (hasImageLoadError) {
            setImageLoadError(false);
          }
        }
      } catch (error) {
        if (!hasImageLoadError) {
          setImageLoadError(true);
        }
      }
    }
    fetchImage();
  }, [
    thumb,
    cacheTimeStamp,
    bottomImageSrc,
    hasImageLoadError,
    setImageLoadError
  ]);

  // Effect - Step 2: initial top layer image load
  useEffect(() => {
    const isFirstLoad = src !== "" && topImageSrc === "";
    async function fetchImage() {
      try {
        if (isFirstLoad) {
          console.log("Step 2: initial top layer image load", {
            src,
            cacheTimeStamp,
            topImageSrc,
            hasImageLoadError
          });
          setReadyToReload(false);

          const topSrc = await loadImage({
            src,
            cacheTimeStamp
          });
          topSrc !== "" && setTopImageSrc(topSrc);

          if (hasImageLoadError) {
            setImageLoadError(false);
          }
        }
      } catch (error) {
        if (!hasImageLoadError) {
          setImageLoadError(true);
        }
      }
    }
    fetchImage();
  }, [
    src,
    cacheTimeStamp,
    topImageSrc,
    hasImageLoadError,
    setImageLoadError,
    setReadyToReload
  ]);

  // Effect: Step 6: update top image
  useEffect(() => {
    const toUpdate =
      !topImageSrc.includes(cacheTimeStamp) &&
      topImageSrc !== "" &&
      cacheTimeStamp !== "";
    if (toUpdate) {
      async function fetchImage() {
        try {
          console.log("Step 6: update top image");
          setReadyToReload(false);

          const topSrc = await loadImage({
            src,
            cacheTimeStamp
          });
          topSrc !== "" && setTopImageSrc(topSrc);

          if (hasImageLoadError) {
            setImageLoadError(false);
          }
        } catch (error) {
          if (!hasImageLoadError) {
            setImageLoadError(true);
          }
        }
      }
      fetchImage();
    }
  }, [
    src,
    cacheTimeStamp,
    topImageSrc,
    hasImageLoadError,
    setImageLoadError,
    setReadyToReload
  ]);

  // Effect - Step3: swap bottom layer image with top layer image
  useEffect(() => {
    if (topImageVisible) {
      // console.log("Step 3: swap bottom layer image with top layer image");
      setBottomImageSrc(topImageSrc);
    }
  }, [topImageVisible, topImageSrc]);

  // event handlers
  const onBottomImageLoad = ({ target }) => {
    if (topImageSrc === target.src) {
      // Step 4: bottom layer is set top same src as top layer, hide top layer
      setTopImageLoaded(false);
    } else {
      setBottomImageLoaded(true);
    }
  };

  const onTopImageLoad = () => {
    setTopImageLoaded(true);
  };

  const onTopImageTransitionEnd = ({ target }) => {
    const { opacity } = getComputedStyle(target);
    if (opacity === "1") {
      setTopImageVisible(true);
      setRefreshDate(new Date());
    }
    if (opacity === "0") {
      // console.log("Step 5: top layer is hidden, initiate next update loop");
      setTopImageVisible(false);
      setTopImageLoaded(false);
      setReadyToReload(true);
    }
  };

  const isFullDisk = alt.includes("Full Disk");
  const isGoesEastFullDisk = alt.includes("GOES East Full Disk");
  console.log({ isFullDisk, isGoesEastFullDisk });

  return (
    <div css={componentStyle({ isFullDisk })} onClick={closeMenu}>
      <div
        css={bottomLayerStyle({
          isVisible: bottomImageLoaded
        })}
        onLoad={onBottomImageLoad}
      >
        <img css={imgStyle({ isFullDisk })} src={bottomImageSrc} alt={alt} />
      </div>
      <div
        css={topLayerStyle({ isVisible: topImageLoaded })}
        onTransitionEnd={onTopImageTransitionEnd}
      >
        <img
          css={imgStyle({ isFullDisk })}
          src={topImageSrc}
          alt={alt}
          onLoad={onTopImageLoad}
        />
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

export default Component;
