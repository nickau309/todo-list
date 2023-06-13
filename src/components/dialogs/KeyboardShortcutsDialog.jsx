import React from "react";
import { Dialog } from "@headlessui/react";
import { CloseIcon24 } from "@assets";
import { ErrorComponent } from "@components";
import { QuaternaryButton } from "@components/buttons";
import { BaseOverlayDialog } from "@components/dialogs";
import { classNames } from "@utils";

export default function KeyboardShortcutsDialog({
  afterLeave = () => {},
  isOpen,
  onClose = () => {},
}) {
  return (
    <BaseOverlayDialog
      afterLeave={afterLeave}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex h-full justify-end pt-8 min-[400px]:p-8">
        <Dialog.Panel
          className={classNames(
            "flex max-h-full w-full max-w-[400px] flex-col divide-y divide-divider-tertiary overflow-hidden rounded-t-[10px] bg-default font-reactist text-sm text-base-primary shadow-[0_2px_8px_rgb(0,0,0,.16)]",
            "min-[400px]:rounded-b-[10px]"
          )}
        >
          <header className="flex shrink-0 basis-12 items-center justify-between gap-4 p-2 pl-4">
            <Dialog.Title className="text-base/5 font-bold">
              Keyboard Shortcuts
            </Dialog.Title>
            <QuaternaryButton
              onClick={onClose}
              className="w-8 shrink-0 transition-colors duration-300"
            >
              <CloseIcon24 />
            </QuaternaryButton>
          </header>
          <div className="grid grow place-items-center gap-4 overflow-auto p-4 pb-8">
            <ErrorComponent errorText="Feature not implemented." />
          </div>
        </Dialog.Panel>
      </div>
    </BaseOverlayDialog>
  );
}
