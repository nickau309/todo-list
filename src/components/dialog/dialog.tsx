"use client";

import {
  UseFloatingData,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DialogOptions = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  afterUnmount?: () => void;
};

type Prettify<T> = { [K in keyof T]: T[K] };

type ContextType = Prettify<
  {
    onOpenChange: (open: boolean) => void;
  } & Pick<UseFloatingData, "context" | "refs"> &
    Omit<ReturnType<typeof useInteractions>, "getItemProps"> &
    ReturnType<typeof useTransitionStyles>
>;

const DialogContext = createContext<ContextType | null>(null);

export default function Dialog({
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  afterUnmount,
}: {
  children: ReactNode;
} & DialogOptions) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = setControlledOpen ?? setUncontrolledOpen;

  const whileElementsMounted = useCallback(() => {
    return () => {
      afterUnmount?.();
    };
  }, [afterUnmount]);

  const { context, refs } = useFloating({
    open,
    onOpenChange,
    whileElementsMounted,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0 },
  });

  const value = useMemo(
    () => ({
      onOpenChange,
      context,
      refs,
      getReferenceProps,
      getFloatingProps,
      isMounted,
      styles,
    }),
    [
      context,
      getFloatingProps,
      getReferenceProps,
      isMounted,
      refs,
      onOpenChange,
      styles,
    ],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export function useDialogContext(component: string) {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <Dialog /> component.`,
    );
  }

  return context;
}
