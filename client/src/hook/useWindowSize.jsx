import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setwindowSize] = useState({
    width: 0,
    height: 0,
  });

  //functions
  const handleResize = () => {
    setwindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
