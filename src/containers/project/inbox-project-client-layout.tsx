"use client";

import useGetInboxProject from "@/hooks/project/use-get-inbox-project";
import type { ReactNode } from "react";
import ProjectView from "./project-view";

type LayoutProps = {
  children: ReactNode;
};

export default function InboxProjectClientLayout({ children }: LayoutProps) {
  const { data } = useGetInboxProject();

  if (data === undefined) {
    return null;
  }

  return <ProjectView project={data}>{children}</ProjectView>;
}
