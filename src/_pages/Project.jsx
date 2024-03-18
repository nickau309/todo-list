/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { redirect } from "react-router-dom";
import { EditorProvider, ShowCompletedProvider } from "@/contexts";
import {
  addProject,
  addTask,
  deleteProject,
  deleteTask,
  duplicateProject,
  duplicateTask,
  getTasksInfo,
  moveTask,
  updateProject,
  updateTask,
} from "@/data";
import { ProjectView } from "@/layouts";

export async function loader({ params }) {
  const data = await getTasksInfo({ projectId: params.projectId });
  if (!data) {
    throw new Response("", { status: 404, statusText: "Project not found." });
  }
  const { completeOrder, incompleteOrder, tasks } = data;

  return { completeOrder, incompleteOrder, tasks };
}

export async function action({ request }) {
  const formData = await request.formData();
  const { type, shouldRedirect, ...data } = Object.fromEntries(formData);

  if (type === "addTask") {
    await addTask(data);
  } else if (type === "deleteTask") {
    await deleteTask(data);
  } else if (type === "duplicateTask") {
    await duplicateTask(data);
  } else if (type === "moveTask") {
    await moveTask(data);
  } else if (type === "updateTask") {
    await updateTask(data);
  } else if (type === "addProject") {
    await addProject(data);
  } else if (type === "deleteProject") {
    await deleteProject(data);
  } else if (type === "duplicateProject") {
    await duplicateProject(data);
  } else if (type === "updateProject") {
    await updateProject(data);
  } else {
    throw new Error("Unknown type: " + type);
  }

  return shouldRedirect === "true" ? redirect("/") : null;
}

export default function Project() {
  return (
    <EditorProvider>
      <ShowCompletedProvider>
        <ProjectView />
      </ShowCompletedProvider>
    </EditorProvider>
  );
}
