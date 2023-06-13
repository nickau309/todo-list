import React from "react";
import { ErrorDialogProvider } from "@contexts";
import { ProjectExportView } from "@layouts";

export default function ProjectExport() {
  return (
    <ErrorDialogProvider>
      <ProjectExportView />
    </ErrorDialogProvider>
  );
}
