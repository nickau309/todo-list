import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { CloseIcon24 } from "@assets";
import {
  CancelButton,
  SubmitButton,
  QuaternaryButton,
} from "@components/buttons";
import { BaseOverlayDialog } from "@components/dialogs";
import { useConfirmDialogControl, useConfirmDialogState } from "@contexts";

export default function ConfirmDialog() {
  const ref = useRef();

  const { closeDialog, resetDialog } = useConfirmDialogControl();
  const { description, handleSubmit, isOpen, title, verb } =
    useConfirmDialogState();

  return (
    <BaseOverlayDialog
      afterLeave={resetDialog}
      initialFocus={ref}
      isOpen={isOpen}
      onClose={closeDialog}
    >
      <div className="flex h-full items-start justify-center px-8 py-[13vh]">
        <Dialog.Panel className="flex max-h-full w-full max-w-[450px] flex-col rounded-[10px] bg-default text-sm text-base-primary shadow-[0_2px_8px_rgb(0,0,0,.16)]">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              closeDialog();
            }}
            className="flex flex-col divide-y divide-divider-tertiary"
          >
            <header className="flex shrink-0 basis-12 items-center justify-between gap-4 p-2 pl-4">
              <Dialog.Title className="font-reactist text-base/5 font-bold">
                {title}
              </Dialog.Title>
              <QuaternaryButton
                onClick={closeDialog}
                className="w-8 shrink-0 transition-colors duration-300"
              >
                <CloseIcon24 />
              </QuaternaryButton>
            </header>
            <div className="overflow-auto p-4 pb-8 text-sm/[18.4px]">
              {description}
            </div>
            <footer className="flex justify-end gap-4 p-4">
              <CancelButton
                onClick={closeDialog}
                className="min-w-[68px] px-3 transition-colors duration-300"
              >
                <span className="leading-8">Cancel</span>
              </CancelButton>
              <SubmitButton
                ref={ref}
                className="min-w-[68px] px-3 transition-colors duration-300"
              >
                <span className="leading-8">{verb}</span>
              </SubmitButton>
            </footer>
          </form>
        </Dialog.Panel>
      </div>
    </BaseOverlayDialog>
  );
}
