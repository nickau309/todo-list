"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

const ShowCompletedContext = createContext(null);
const SetShowCompletedContext = createContext(null);

export function ShowCompletedProvider({ children }) {
  const [showCompleted, setShowCompleted] = useState(false);
  const { projectId } = useParams();

  useLayoutEffect(() => {
    setShowCompleted(false);
  }, [projectId]);

  return (
    <ShowCompletedContext.Provider value={showCompleted}>
      <SetShowCompletedContext.Provider value={setShowCompleted}>
        {children}
      </SetShowCompletedContext.Provider>
    </ShowCompletedContext.Provider>
  );
}

export function useShowCompleted() {
  return useContext(ShowCompletedContext);
}

export function useSetShowCompleted() {
  return useContext(SetShowCompletedContext);
}
