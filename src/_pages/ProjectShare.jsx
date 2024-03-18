import React from "react";
import { ErrorDialogProvider } from "@/contexts";
import { ProjectShareView } from "@/layouts";

export default function ProjectShare() {
  return (
    <ErrorDialogProvider>
      <ProjectShareView />
    </ErrorDialogProvider>
  );
}
