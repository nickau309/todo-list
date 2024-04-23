"use client";

import { CloseIcon24 } from "@/assets";
import {
  Button,
  Dialog,
  Dismiss,
  Panel,
  Portal,
  Title,
} from "@/components/dialog";
import DialogLoadingComponent from "@/components/dialog-loading-component";
import ErrorComponent from "@/components/error-component";
import { useIsOpen, useSetIsOpen } from "@/contexts/add-team-dialog-context";
import clsx from "clsx";
import { Suspense } from "react";

export default function AddTeamDialog() {
  const isOpen = useIsOpen();
  const setIsOpen = useSetIsOpen();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        aria-label="Open/close add team dialog"
        className="hidden"
      />
      <Portal className="flex h-full items-start justify-center p-8 pt-[13vh]">
        <Panel
          className={clsx(
            "flex h-full max-h-[74vh] w-full max-w-[450px] flex-col overflow-hidden rounded-[10px]",
            "bg-background-base-primary text-display-primary-idle-tint",
            "shadow-[0_2px_8px_rgba(0,0,0,.16)]",
            "max-[400px]:max-w-full min-[749px]:max-w-3xl",
          )}
        >
          <header className="flex items-center justify-between gap-4 p-2 pl-4">
            <Title className="text-lg/[23.2px] font-bold">Add A team</Title>
            <Dismiss
              type="button"
              aria-disabled="false"
              aria-label="Close modal"
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
          <div className="grid min-h-0 flex-1 place-items-center overflow-y-auto overflow-x-hidden pb-4 pt-1">
            <Suspense fallback={<DialogLoadingComponent />}>
              <ErrorComponent text="Feature not implemented." />
            </Suspense>
          </div>
        </Panel>
      </Portal>
    </Dialog>
  );
}
