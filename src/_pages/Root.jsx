/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { redirect } from "react-router-dom";
import {
  ConfirmDialogProvider,
  DialogProvider,
  ErrorDialogProvider,
  RootProvider,
  SettingsProvider,
} from "@/contexts";
import {
  addProject,
  deleteProject,
  getLabels,
  getProjects,
  getIncompleteTasksCount,
  moveProject,
  updateProject,
  duplicateProject,
  addTask,
} from "@/data";
import { RootView } from "@/layouts";

export async function loader() {
  const projects = await getProjects();
  const labels = await getLabels();
  const { incompleteTasksCountMap, isOverdue } =
    await getIncompleteTasksCount();

  return {
    incompleteTasksCountMap,
    isOverdue,
    labels,
    projects,
  };
}

export async function action({ request }) {
  const formData = await request.formData();
  const { type, shouldRedirect, ...data } = Object.fromEntries(formData);

  if (type === "addTask") {
    await addTask(data);
  } else if (type === "addProject") {
    await addProject(data);
  } else if (type === "deleteProject") {
    await deleteProject(data);
  } else if (type === "duplicateProject") {
    await duplicateProject(data);
  } else if (type === "moveProject") {
    await moveProject(data);
  } else if (type === "updateProject") {
    await updateProject(data);
  } else {
    throw new Error("Unknown type: " + type);
  }

  return shouldRedirect === "true" ? redirect("/") : null;
}

export default function Root() {
  return (
    <SettingsProvider>
      <RootProvider>
        <ConfirmDialogProvider>
          <DialogProvider>
            <ErrorDialogProvider>
              <RootView />
            </ErrorDialogProvider>
          </DialogProvider>
        </ConfirmDialogProvider>
      </RootProvider>
    </SettingsProvider>
  );
}
