import { useState, useEffect } from "react";

import { useNotifications } from "../../state/useNotifications";

const loadImage = ({ src }) => {
  const img = new Image();
  // img.src = `${src}?t=${Date.now()}`; // cache busting timestamp - TODO - decide if needed
  img.src = src;
  return new Promise((resolve, reject) => {
    img.onload = ({ target }) => {
      //console.log("Image load complete", { src });
      resolve(target.src);
    };
    img.onerror = error => {
      //console.error({ error });
      //console.error("Image load error", { src, error });
      reject(error);
    };
  });
};

function useImageLoad({ src = "" }) {
  //console.log("useImageLoad", { src });
  const [isLoaded, setIsLoaded] = useState(false);
  //const [isPending, setIsPending] = useState(false);
  //const [hasError, setHasError] = useState(false);

  const {
    state: { isPending, hasError },
    setHasError,
    setIsPending
  } = useNotifications();

  useEffect(() => {
    if (src !== "") {
      setIsPending(true);
      (async () => {
        try {
          const value = await loadImage({ src });
          setIsPending(false);
          //hasError && setHasError(false);
          //setIsPending(false);
          setIsLoaded(value);
        } catch (error) {
          //setHasError(true);
          //setIsPending(false);
        }
      })();
    }
  }, [src, setIsPending]);
  return [isLoaded];
}

export default useImageLoad;
