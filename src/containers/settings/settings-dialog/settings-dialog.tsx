import { useDialog } from "@/lib/floating-ui";
import type {
  UseFloatingData,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { useFloating } from "@floating-ui/react";
import type { ReactNode } from "react";
import { createContext, useContext, useId, useMemo } from "react";

type DialogContextType = {
  open: boolean;
  labelId: string;
} & Pick<UseFloatingData, "context" | "refs"> &
  Pick<UseInteractionsReturn, "getFloatingProps">;

type DialogProps = {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const DialogContext = createContext<DialogContextType | null>(null);

export default function SettingsDialog({
  children,
  onOpenChange,
  open,
}: DialogProps) {
  const labelId = useId();

  const { context, refs } = useFloating({ open, onOpenChange });

  const { getFloatingProps } = useDialog(context);

  const value = useMemo<DialogContextType>(
    () => ({ open, labelId, context, refs, getFloatingProps }),
    [context, getFloatingProps, labelId, open, refs],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export function useSettingsDialog(component: string) {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <SettingsDialog /> component.`,
    );
  }

  return context;
}
