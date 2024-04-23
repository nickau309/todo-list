"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ConfirmDialogStateContext = createContext(null);
const ConfirmDialogControlContext = createContext(null);

export function ConfirmDialogProvider({ children }) {
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
    <ConfirmDialogStateContext.Provider value={stateContextValue}>
      <ConfirmDialogControlContext.Provider value={controlContextValue}>
        {children}
      </ConfirmDialogControlContext.Provider>
    </ConfirmDialogStateContext.Provider>
  );
}

export function useConfirmDialogState() {
  return useContext(ConfirmDialogStateContext);
}

export function useConfirmDialogControl() {
  return useContext(ConfirmDialogControlContext);
}

const initialData = {
  description: "",
  handleSubmit: () => {},
  title: "",
  verb: "",
};
