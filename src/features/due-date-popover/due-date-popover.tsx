import { useDialog } from "@/lib/floating-ui";
import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react";
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

  const { getReferenceProps, getFloatingProps } = useDialog(context, {
    enabled: !disabled,
  });

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
