import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type PopoverContextType = {
  disabled: boolean;
  dueDate: Date | null;
  setDueDate: (date: Date | null) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<UseFloatingData, "context" | "floatingStyles" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps">;

type PopoverProps = {
  children: ReactNode;
  disabled?: boolean;
  dueDate: Date | null;
  setDueDate: (dueDate: Date | null) => void;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export default function DueDatePopover({
  children,
  disabled = false,
  dueDate,
  setDueDate,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating<HTMLButtonElement>({
    placement: "bottom",
    middleware: [
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !disabled });
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  const value = useMemo(
    () => ({
      disabled,
      dueDate,
      setDueDate,
      isOpen,
      setIsOpen,
      context,
      floatingStyles,
      refs,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      context,
      disabled,
      dueDate,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      isOpen,
      refs,
      setDueDate,
    ],
  );

  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
}

export function useDueDatePopover(component: string) {
  const context = useContext(PopoverContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <DueDatePopover /> component.`,
    );
  }

  return context;
}
