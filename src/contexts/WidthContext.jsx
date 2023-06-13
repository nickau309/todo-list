/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

const WidthContext = createContext();

function getWindowInnerWidth() {
  return window.innerWidth;
}

export function WidthProvider({ children }) {
  const [width, setWidth] = useState(getWindowInnerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowInnerWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WidthContext.Provider value={width}>{children}</WidthContext.Provider>
  );
}

export function useWidth() {
  return useContext(WidthContext);
}
