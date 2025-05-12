import { useDialog } from "@/lib/floating-ui";
import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { useFloating, useTransitionStyles } from "@floating-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type DialogContextType = {
  disabled: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<UseFloatingData, "context" | "refs"> &
  Pick<UseInteractionsReturn, "getReferenceProps" | "getFloatingProps"> &
  ReturnType<typeof useTransitionStyles>;

type DialogProps = {
  children: ReactNode;
  disabled?: boolean;
};

const DialogContext = createContext<DialogContextType | null>(null);

export default function UnlockRemindersDialog({
  children,
  disabled = false,
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const { getReferenceProps, getFloatingProps } = useDialog(context, {
    enabled: !disabled,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0 },
  });

  const value = useMemo(
    () => ({
      disabled,
      setIsOpen,
      context,
      refs,
      getReferenceProps,
      getFloatingProps,
      isMounted,
      styles,
    }),
    [
      context,
      disabled,
      getFloatingProps,
      getReferenceProps,
      isMounted,
      refs,
      styles,
    ],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export function useUnlockRemindersDialog(component: string) {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <UnlockRemindersDialog /> component.`,
    );
  }

  return context;
}
