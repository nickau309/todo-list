import React from "react";
import { Dialog } from "@headlessui/react";
import { CloseIcon24 } from "@assets";
import { ErrorComponent } from "@components";
import { QuaternaryButton } from "@components/buttons";
import { BaseOverlayDialog } from "@components/dialogs";
import { useErrorDialogControl, useErrorDialogState } from "@contexts";
import { classNames } from "@utils";

export default function ErrorDialog({ afterLeave = () => {} }) {
  const { closeDialog, resetDialog } = useErrorDialogControl();
  const { isOpen, maxWidth, title } = useErrorDialogState();

  return (
    <BaseOverlayDialog
      afterLeave={() => {
        resetDialog();
        afterLeave();
      }}
      isOpen={isOpen}
      onClose={closeDialog}
    >
      <div className="flex h-full items-start justify-center px-8 py-[13vh]">
        <Dialog.Panel
          className={classNames(
            "flex max-h-full w-full",
            maxWidth,
            "flex-col divide-y divide-divider-tertiary rounded-[10px] bg-default font-reactist text-sm text-base-primary shadow-[0_2px_8px_rgb(0,0,0,.16)]"
          )}
        >
          <header className="flex shrink-0 basis-12 items-center justify-between gap-4 p-2 pl-4">
            <Dialog.Title className="text-xl/[24.8px] font-bold">
              {title}
            </Dialog.Title>
            <QuaternaryButton
              onClick={closeDialog}
              className="w-8 shrink-0 transition-colors duration-300"
            >
              <CloseIcon24 />
            </QuaternaryButton>
          </header>
          <div className="flex min-h-0 flex-col items-center gap-4 overflow-auto p-4 pb-8">
            <ErrorComponent errorText="Feature not implemented." />
          </div>
        </Dialog.Panel>
      </div>
    </BaseOverlayDialog>
  );
}
