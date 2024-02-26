import React from "react";
import { Dialog } from "@headlessui/react";
import { ErrorComponent } from "@/components";
import { BaseDialog } from "@/components/dialogs";

export default function CommandMenuDialog({
  afterLeave = () => {},
  isOpen,
  onClose = () => {},
}) {
  return (
    <BaseDialog afterLeave={afterLeave} isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-start p-8 pt-[13vh]">
        <div className="h-[max(0px,calc(13vh-32px))] w-full shrink-0"></div>
        <Dialog.Panel className="flex min-h-0 w-full max-w-[500px] flex-col overflow-hidden rounded-[10px] border-dialog-width border-dialog bg-default font-reactist text-sm text-base-primary shadow-dialog">
          <div className="flex basis-[370px] items-center justify-center overflow-auto p-4 pb-8">
            <ErrorComponent errorText="Feature not implemented." />
          </div>
        </Dialog.Panel>
      </div>
    </BaseDialog>
  );
}
