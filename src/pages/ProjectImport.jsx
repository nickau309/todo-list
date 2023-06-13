import React from "react";
import { ErrorDialogProvider } from "@contexts";
import { ProjectImportView } from "@layouts";

export default function ProjectImport() {
  return (
    <ErrorDialogProvider>
      <ProjectImportView />
    </ErrorDialogProvider>
  );
}
