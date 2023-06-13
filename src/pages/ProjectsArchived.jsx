/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { redirect, useRouteLoaderData } from "react-router-dom";
import { deleteProject, updateProject } from "@data";
import { ProjectListItem } from "@features";

export async function action({ request }) {
  const formData = await request.formData();
  const { type, shouldRedirect, ...data } = Object.fromEntries(formData);

  if (type === "deleteProject") {
    await deleteProject(data);
  } else if (type === "updateProject") {
    await updateProject(data);
  } else {
    throw new Error("Unknown type: " + type);
  }

  return shouldRedirect === "true" ? redirect("/") : null;
}

export default function ProjectsArchived() {
  const { projects } = useRouteLoaderData("root");

  return (
    <ul className="w-full max-w-[800px]">
      {projects
        .filter((p) => p.isArchived)
        .map((p) => (
          <ProjectListItem
            key={p.id}
            color={p.color}
            id={p.id}
            isArchived={p.isArchived}
            name={p.name}
          />
        ))}
    </ul>
  );
}
