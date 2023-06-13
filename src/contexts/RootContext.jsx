/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWidth } from "./WidthContext";

const ShowSidebarContext = createContext(null);
const ShowSidebarSmContext = createContext(null);
const SetShowSidebarContext = createContext(null);
const SetShowSidebarSmContext = createContext(null);

export function RootProvider({ children }) {
  const [showSidebarLg, setShowSidebarLg] = useState(true);
  const [showSidebarSm, setShowSidebarSm] = useState(false);

  const width = useWidth();

  useEffect(() => {
    if (width >= 751) {
      setShowSidebarSm(false);
    } else {
      setShowSidebarLg(true);
    }
  }, [width]);

  const showSidebar = width >= 751 ? showSidebarLg : showSidebarSm;

  const setShowSidebar = width >= 751 ? setShowSidebarLg : setShowSidebarSm;

  return (
    <ShowSidebarContext.Provider value={showSidebar}>
      <ShowSidebarSmContext.Provider value={showSidebarSm}>
        <SetShowSidebarContext.Provider value={setShowSidebar}>
          <SetShowSidebarSmContext.Provider value={setShowSidebarSm}>
            {children}
          </SetShowSidebarSmContext.Provider>
        </SetShowSidebarContext.Provider>
      </ShowSidebarSmContext.Provider>
    </ShowSidebarContext.Provider>
  );
}

export function useShowSidebar() {
  return useContext(ShowSidebarContext);
}

export function useShowSidebarSm() {
  return useContext(ShowSidebarSmContext);
}

export function useSetShowSidebar() {
  return useContext(SetShowSidebarContext);
}

export function useSetShowSidebarSm() {
  return useContext(SetShowSidebarSmContext);
}
