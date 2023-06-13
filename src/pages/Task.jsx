/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { BaseOverlayDialog } from "@components/dialogs";
import {
  ConfirmDialogProvider,
  EditorProvider,
  ErrorDialogProvider,
  ShowCompletedProvider,
} from "@contexts";
import {
  addLabel,
  addProject,
  addTask,
  deleteTask,
  duplicateTask,
  getTasksInfo,
  moveTask,
  removeTaskLabel,
  updateTask,
} from "@data";
import { TaskView } from "@layouts";

export async function loader({ params }) {
  const data = await getTasksInfo({ taskId: params.taskId });
  if (!data) {
    return redirect("..");
  }
  const { completeOrder, incompleteOrder, siblingOrder, tasks } = data;

  return { completeOrder, incompleteOrder, siblingOrder, tasks };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const { type, shouldRedirect, ...data } = Object.fromEntries(formData);

  if (type === "addTask") {
    await addTask({ ...data, parentId: params.taskId });
  } else if (type === "deleteTask") {
    await deleteTask(data);
  } else if (type === "duplicateTask") {
    await duplicateTask(data);
  } else if (type === "updateTask") {
    await updateTask(data);
  } else if (type === "removeTaskLabel") {
    await removeTaskLabel(data);
  } else if (type === "moveTask") {
    await moveTask(data);
  } else if (type === "addProject") {
    await addProject(data);
  } else if (type === "addLabel") {
    await addLabel(data);
  } else {
    throw new Error("Unknown type: " + type);
  }

  return shouldRedirect === "true" ? redirect("..") : null;
}

export default function Task() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <EditorProvider>
      <ShowCompletedProvider>
        <ConfirmDialogProvider>
          <ErrorDialogProvider>
            <BaseOverlayDialog
              afterLeave={() => navigate("..")}
              isOpen={isOpen}
              onClose={handleClose}
            >
              <TaskView handleClose={handleClose} />
            </BaseOverlayDialog>
          </ErrorDialogProvider>
        </ConfirmDialogProvider>
      </ShowCompletedProvider>
    </EditorProvider>
  );
}
