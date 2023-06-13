import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { ConfirmDialog, ErrorDialog } from "@components/dialogs";
import { classNames } from "@utils";
import Content from "./Content";
import Header from "./Header";

export default function TaskView({ handleClose }) {
  const { tasks } = useLoaderData();
  const { taskId } = useParams();

  const {
    name,
    description,
    isCompleted,
    dueDate,
    priority,
    projectId,
    labelIds,
    addedAt,
  } = tasks.find((t) => t.id === taskId);

  return (
    <div className="flex h-full justify-center pt-8 min-[580px]:p-8">
      <Dialog.Panel
        className={classNames(
          "flex w-full max-w-[864px] flex-col divide-y divide-divider-tertiary overflow-hidden rounded-t-[10px] bg-default text-sm text-content-secondary shadow-[0_2px_8px_rgb(0,0,0,.16)]",
          "min-[580px]:rounded-b-[10px]"
        )}
      >
        <header className="basis-12">
          <Header
            addedAt={addedAt}
            handleClose={handleClose}
            name={name}
            projectId={projectId}
          />
        </header>
        <div className="min-h-0 flex-1">
          <Content
            key={taskId}
            description={description}
            dueDate={dueDate}
            isCompleted={isCompleted}
            labelIds={labelIds}
            name={name}
            priority={priority}
            projectId={projectId}
          />
        </div>
        <ConfirmDialog />
        <ErrorDialog />
      </Dialog.Panel>
    </div>
  );
}
