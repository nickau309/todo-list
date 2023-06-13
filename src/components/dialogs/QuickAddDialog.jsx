import React from "react";
import { useFetcher } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { BaseDialog } from "@components/dialogs";
import { useQuickAddDialogControl, useQuickAddDialogState } from "@contexts";
import { TaskEditor } from "@features";

export default function QuickAddDialog() {
  const fetcher = useFetcher();

  const { closeDialog } = useQuickAddDialogControl();
  const isOpen = useQuickAddDialogState();

  return (
    <BaseDialog isOpen={isOpen} onClose={closeDialog}>
      <div className="flex h-full flex-col items-center justify-start p-8">
        <Dialog.Panel className="mt-[calc(13vh-32px)] flex min-h-0 w-full max-w-[550px] flex-col overflow-hidden rounded-[10px] border-dialog-width border-dialog bg-default text-sm text-base-primary shadow-dialog">
          <TaskEditor
            editType="AddTask"
            isInDialog
            onClose={closeDialog}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(
                e.currentTarget instanceof HTMLFormElement
                  ? e.currentTarget
                  : e.currentTarget.form
              );
              formData.append("type", "addTask");
              fetcher.submit(formData, { method: "post" });
              closeDialog();
            }}
            verb="Add task"
          />
        </Dialog.Panel>
      </div>
    </BaseDialog>
  );
}
