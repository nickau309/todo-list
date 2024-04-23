"use client";

import {
  FloatingFocusManager,
  type FloatingFocusManagerProps,
} from "@floating-ui/react";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { useDialogContext } from "./dialog";

type PanelContextType = {
  setLabelId: Dispatch<SetStateAction<string | undefined>>;
  setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
};

type PanelProps = ComponentPropsWithoutRef<"div"> &
  Pick<FloatingFocusManagerProps, "initialFocus">;

const PanelContext = createContext<PanelContextType | null>(null);

export default function Panel({
  "aria-label": ariaLabel,
  initialFocus,
  ...props
}: PanelProps) {
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const { context, refs, getFloatingProps } = useDialogContext("Dialog.Panel");

  const value = useMemo(() => ({ setLabelId, setDescriptionId }), []);

  return (
    <PanelContext.Provider value={value}>
      <FloatingFocusManager context={context} initialFocus={initialFocus}>
        <div
          ref={refs.setFloating}
          aria-label={labelId ? undefined : ariaLabel}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          {...getFloatingProps(props)}
        />
      </FloatingFocusManager>
    </PanelContext.Provider>
  );
}

export function useDialogPanelContext(component: string) {
  const context = useContext(PanelContext);

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <Dialog.Panel /> component.`,
    );
  }

  return context;
}
