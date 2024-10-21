import { OptimisticProjectProvider } from "@/containers/project/contexts/optimistic-project-context";
import ProjectClientLayout from "@/containers/project/project-client-layout";
import { getProject } from "@/lib/data";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: {
    projectId: string;
  };
  task: ReactNode;
};

export default async function ProjectServerLayout({
  children,
  params,
  task,
}: LayoutProps) {
  const { projectId } = params;
  const project = await getProject(projectId);

  return (
    <OptimisticProjectProvider project={project}>
      <ProjectClientLayout>
        {children}
        {task}
      </ProjectClientLayout>
    </OptimisticProjectProvider>
  );
}
