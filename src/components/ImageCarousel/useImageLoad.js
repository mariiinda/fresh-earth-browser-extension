import { useState, useEffect } from "react";

import { useNotifications } from "../../state/useNotifications";

const loadImage = ({ src }) => {
  const img = new Image();
  // img.src = `${src}?t=${Date.now()}`; // cache busting timestamp - TODO - decide if needed
  img.src = src;
  console.log("Image load:", { src });
  return new Promise((resolve, reject) => {
    img.onload = ({ target }) => {
      console.log("preload img loading done");
      resolve(target.src);
    };
    img.onerror = error => {
      reject(error);
    };
  });
};

function useImageLoad({ src = "", isActive }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setHasError, setIsPending, setRefreshDate } = useNotifications();

  useEffect(() => {
    if (src !== "" && isActive) {
      setIsPending(true);
      (async () => {
        try {
          const value = await loadImage({ src });
          setIsPending(false);
          setHasError(false);
          setRefreshDate(new Date());
          setIsLoaded(value);
        } catch (error) {
          console.error({ error });
          setHasError(true);
          setIsPending(false);
        }
      })();
    }
  }, [src, isActive, setIsPending, setHasError, setRefreshDate]);
  return [isLoaded];
}

export default useImageLoad;
