import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

type DialogContextType = Pick<UseFloatingData, "context" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps"> &
  ReturnType<typeof useTransitionStyles>;

type DialogProps = {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const DialogContext = createContext<DialogContextType | null>(null);

export default function QuickAddDialog({
  children,
  onOpenChange,
  open,
}: DialogProps) {
  const { context, refs } = useFloating({ open, onOpenChange });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 100,
    initial: {
      opacity: 0,
      transform: "scale(.6)",
    },
  });

  const value = useMemo<DialogContextType>(
    () => ({
      context,
      refs,
      getReferenceProps,
      getFloatingProps,
      isMounted,
      styles,
    }),
    [context, getFloatingProps, getReferenceProps, isMounted, refs, styles],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export function useQuickAddDialog(component: string) {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <QuickAddDialog /> component.`,
    );
  }

  return context;
}
