import React from "react";
import {
  Outlet,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { TaskList } from "@features";
import ProjectArchiveBanner from "./ProjectArchiveBanner";
import ProjectCommentButton from "./ProjectCommentButton";
import ProjectEmptyComponent from "./ProjectEmptyComponent";
import ProjectName from "./ProjectName";
import ProjectShareButton from "./ProjectShareButton";
import ProjectViewMenu from "./ProjectViewMenu";
import ProjectViewOptions from "./ProjectViewOptions";

export default function ProjectView() {
  const { tasks } = useLoaderData();
  const { projectId } = useParams();
  const { projects } = useRouteLoaderData("root");

  const project = projects.find((p) => p.id === projectId);

  const { childOrder, name, isArchived, viewStyle } = project;

  return (
    <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-base-primary">
      <header className="sticky top-0 z-10 flex shrink-0 items-center justify-center bg-base-primary px-[55px] pt-9 text-white">
        <div className="flex w-full max-w-[800px] items-start justify-between gap-4 border-b border-divider-base pb-2">
          <ProjectName childOrder={childOrder} name={name} />
          <div className="flex gap-4">
            {childOrder !== 0 && !isArchived && <ProjectShareButton />}
            {!isArchived && <ProjectViewOptions viewStyle={viewStyle} />}
            <ProjectCommentButton />
            {!isArchived && (
              <ProjectViewMenu childOrder={childOrder} name={name} />
            )}
          </div>
        </div>
      </header>
      <div className="flex min-h-0 grow flex-col items-center gap-[18px] px-[55px]">
        {isArchived && <ProjectArchiveBanner />}
        <TaskList key={projectId} isArchived={isArchived} />
        {!isArchived && tasks.length === 0 && <ProjectEmptyComponent />}
      </div>
      <Outlet />
    </div>
  );
}
