"use client";

import useGetProject from "@/hooks/project/use-get-project";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import ProjectView from "./project-view";

type LayoutProps = {
  children: ReactNode;
};

export default function ProjectClientLayout({ children }: LayoutProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const { data } = useGetProject({ id: projectId });

  useEffect(() => {
    if (data?.isInboxProject) {
      // use redirect instead of router.replace in next 15
      router.replace("/app/inbox");
    }
  }, [data, router]);

  if (data === undefined) {
    return null;
  }

  return <ProjectView project={data}>{children}</ProjectView>;
}
