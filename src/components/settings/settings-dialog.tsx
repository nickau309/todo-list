"use client";

import { Button, Dialog, Panel, Portal } from "@/components/dialog";
import { useConfirmDialogControl } from "@/contexts/confirm-dialog-context";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import { useDiscardChanges } from "@/hooks/settings";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

type SettingsDialogProps = {
  children: ReactNode;
};

export default function SettingsDialog({ children }: SettingsDialogProps) {
  const {
    setIsOpen: setIsConfirmDialogOpen,
    setHandleSubmit: setHandleConfirmDialogSubmit,
  } = useConfirmDialogControl();

  const { isOpen, afterUnmount } = useSettingsDialogState();
  const { setIsOpen } = useSettingsDialogControl();

  const discardChanges = useDiscardChanges();

  const {
    formState: { isDirty },
    clearErrors,
  } = useFormContext();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open && isDirty) {
        const handleSubmit = () => {
          discardChanges();
          setIsOpen(open);
        };
        setIsConfirmDialogOpen(true);
        setHandleConfirmDialogSubmit(() => handleSubmit);
      } else {
        clearErrors();
        setIsOpen(open);
      }
    },
    [
      clearErrors,
      discardChanges,
      isDirty,
      setHandleConfirmDialogSubmit,
      setIsConfirmDialogOpen,
      setIsOpen,
    ],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      afterUnmount={afterUnmount}
    >
      <Button
        type="button"
        aria-label="Open/close settings"
        className="hidden"
      />
      <Portal
        className={clsx(
          "grid h-full place-items-center p-8",
          "max-[580px]:p-0 max-[580px]:pt-8",
        )}
      >
        <Panel
          aria-label="Settings"
          className={clsx(
            "relative flex h-full max-h-[1000px] w-full max-w-[960px] overflow-hidden rounded-[10px]",
            "bg-background-base-primary text-display-primary-idle-tint",
            "transition-[max-width] duration-200 ease-[cubic-bezier(.42,0,.58,1)]",
            "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
            "max-[1000px]:max-w-3xl",
            "max-[580px]:max-w-full max-[580px]:rounded-b-none",
            "min-[1200px]:max-w-[1060px]",
          )}
        >
          {children}
        </Panel>
      </Portal>
    </Dialog>
  );
}
