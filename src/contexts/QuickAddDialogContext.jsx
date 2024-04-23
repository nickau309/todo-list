"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const QuickAddDialogStateContext = createContext(null);
const QuickAddDialogControlContext = createContext(null);

export function QuickAddDialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const controlContextValue = useMemo(
    () => ({ openDialog, closeDialog }),
    [openDialog, closeDialog],
  );

  return (
    <QuickAddDialogStateContext.Provider value={isOpen}>
      <QuickAddDialogControlContext.Provider value={controlContextValue}>
        {children}
      </QuickAddDialogControlContext.Provider>
    </QuickAddDialogStateContext.Provider>
  );
}

export function useQuickAddDialogState() {
  return useContext(QuickAddDialogStateContext);
}

export function useQuickAddDialogControl() {
  return useContext(QuickAddDialogControlContext);
}
