/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const DialogStateContext = createContext(null);
const DialogControlContext = createContext(null);

export function DialogProvider({ children }) {
  const [id, setId] = useState(null);
  const [type, setType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((type, id = null) => {
    setId(id);
    setType(type);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const resetDialog = useCallback(() => {
    setId(null);
    setType(null);
  }, []);

  const stateContextValue = useMemo(
    () => ({ id, type, isOpen }),
    [id, type, isOpen]
  );

  const controlContextValue = useMemo(
    () => ({ openDialog, closeDialog, resetDialog }),
    [openDialog, closeDialog, resetDialog]
  );

  return (
    <DialogStateContext.Provider value={stateContextValue}>
      <DialogControlContext.Provider value={controlContextValue}>
        {children}
      </DialogControlContext.Provider>
    </DialogStateContext.Provider>
  );
}

export function useDialogState() {
  return useContext(DialogStateContext);
}

export function useDialogControl() {
  return useContext(DialogControlContext);
}
