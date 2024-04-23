"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ErrorDialogStateContext = createContext(null);
const ErrorDialogControlContext = createContext(null);

export function ErrorDialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialData);

  const openDialog = useCallback((data) => {
    setIsOpen(true);
    setData((d) => ({ ...d, ...data }));
  }, []);

  const closeDialog = useCallback(() => setIsOpen(false), []);

  const resetDialog = useCallback(() => setData(initialData), []);

  const stateContextValue = useMemo(
    () => ({ isOpen, ...data }),
    [isOpen, data],
  );

  const controlContextValue = useMemo(
    () => ({ openDialog, closeDialog, resetDialog }),
    [openDialog, closeDialog, resetDialog],
  );

  return (
    <ErrorDialogStateContext.Provider value={stateContextValue}>
      <ErrorDialogControlContext.Provider value={controlContextValue}>
        {children}
      </ErrorDialogControlContext.Provider>
    </ErrorDialogStateContext.Provider>
  );
}

export function useErrorDialogState() {
  return useContext(ErrorDialogStateContext);
}

export function useErrorDialogControl() {
  return useContext(ErrorDialogControlContext);
}

const initialData = {
  maxWidth: "",
  title: "",
};
