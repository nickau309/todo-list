"use client";

import { CloseIcon24 } from "@/assets";
import {
  Button,
  Dialog,
  Description,
  Dismiss,
  Panel,
  Portal,
  Title,
} from "@/components/dialog";
import {
  useConfirmDialogControl,
  useConfirmDialogState,
} from "@/contexts/confirm-dialog-context";
import clsx from "clsx";
import { useRef } from "react";

export default function ConfirmDialog() {
  const initialFocus = useRef<HTMLButtonElement>(null);

  const { isOpen, handleSubmit } = useConfirmDialogState();
  const { setIsOpen } = useConfirmDialogControl();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        aria-label="Open/close confirm dialog"
        className="hidden"
      />
      <Portal className="flex h-full items-start justify-center px-8 py-[13vh]">
        <Panel
          initialFocus={initialFocus}
          className={clsx(
            "flex max-h-full w-full max-w-[450px] overflow-hidden rounded-[10px]",
            "bg-background-base-primary text-display-primary-idle-tint",
            "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
          )}
        >
          <form
            onSubmit={(e) => {
              handleSubmit?.(e);
              setIsOpen(false);
              e.preventDefault();
            }}
            className="flex flex-1 flex-col"
          >
            <header className="flex items-center justify-between gap-4 p-2 pl-4">
              <Title className="text-base/5 font-bold">Discard changes?</Title>
              <Dismiss
                type="button"
                aria-disabled="false"
                aria-label="Cancel"
                className={clsx(
                  "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
                  "text-actionable-quaternary-idle-tint",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                  "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
                )}
              >
                <CloseIcon24 />
              </Dismiss>
            </header>
            <div className="overflow-auto p-4 pb-8">
              <Description className="text-sm/[17.6px]">
                The changes you&apos;ve made won&apos;t be saved.
              </Description>
            </div>
            <footer className="flex justify-end gap-4 p-4">
              <Dismiss
                type="button"
                aria-disabled="false"
                className={clsx(
                  "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                  "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                  "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
                )}
              >
                <span className="truncate text-[13px]/8 font-semibold">
                  Cancel
                </span>
              </Dismiss>
              <button
                ref={initialFocus}
                type="submit"
                aria-disabled="false"
                className={clsx(
                  "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
                  "bg-actionable-primary-idle-fill px-3 text-actionable-primary-idle-tint",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-display-primary-idle-tint",
                  "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-primary-disabled-fill aria-disabled:text-actionable-primary-disabled-tint",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-actionable-primary-hover-fill custom-hocus:text-actionable-primary-hover-tint",
                )}
              >
                <span className="truncate text-[13px]/8 font-semibold">
                  Discard
                </span>
              </button>
            </footer>
          </form>
        </Panel>
      </Portal>
    </Dialog>
  );
}
