import ProjectClientLayout from "@/containers/project/project-client-layout";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: {
    projectId: string;
  };
  task: ReactNode;
};

export default function ProjectServerLayout({ children, task }: LayoutProps) {
  return (
    <ProjectClientLayout>
      {children}
      {task}
    </ProjectClientLayout>
  );
}
