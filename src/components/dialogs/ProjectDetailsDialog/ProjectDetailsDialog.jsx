import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { BaseOverlayDialog } from "@/components/dialogs";
import { classNames } from "@/utils";
import ColorInput from "./ColorInput";
import IsFavoriteInput from "./IsFavoriteInput";
import NameInput from "./NameInput";
import ViewStyleInput from "./ViewStyleInput";

export default function ProjectDetailsDialog({
  afterLeave = () => {},
  defaultColor = "Charcoal",
  defaultIsFavorite = false,
  defaultName = "",
  defaultViewStyle = "list",
  isOpen,
  onClose = () => {},
  onSubmit = () => {},
  verb,
  title,
}) {
  const [name, setName] = useState(defaultName);

  return (
    <BaseOverlayDialog
      afterLeave={afterLeave}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex h-full items-start justify-center px-8 py-[13vh]">
        <Dialog.Panel className="flex max-h-full w-full max-w-[450px] flex-col divide-y divide-divider-tertiary rounded-[10px] bg-default text-sm text-content-primary shadow-[0_2px_8px_rgb(0,0,0,.16)]">
          <header className="flex shrink-0 basis-12 items-center justify-between gap-4 p-2 pl-4">
            <Dialog.Title className="font-reactist text-xl/[24.8px] font-bold">
              {title}
            </Dialog.Title>
          </header>
          <form
            onSubmit={onSubmit}
            className="flex min-h-0 flex-col divide-y divide-divider-tertiary"
          >
            <div className="flex min-h-0 flex-col gap-5 overflow-auto p-4 pb-8 text-sm/[18.4px]">
              <NameInput name={name} setName={setName} />
              <ColorInput defaultColor={defaultColor} />
              <IsFavoriteInput defaultIsFavorite={defaultIsFavorite} />
              <ViewStyleInput defaultViewStyle={defaultViewStyle} />
            </div>
            <footer className="flex shrink-0 justify-end gap-4 p-4">
              <CancelButton
                onClick={onClose}
                className={classNames(
                  "min-w-[68px] px-3 transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
                )}
              >
                <span className="leading-8">Cancel</span>
              </CancelButton>
              <SubmitButton
                disabled={/^\s*$/.test(name)}
                className={classNames(
                  "min-w-[68px] px-3 transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
                )}
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
