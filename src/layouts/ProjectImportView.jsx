import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorDialog } from "@/components/dialogs";
import { useErrorDialogControl } from "@/contexts";

export default function ProjectImportView() {
  const navigate = useNavigate();

  const { openDialog } = useErrorDialogControl();

  useEffect(() => {
    openDialog({
      maxWidth: "max-w-[450px]",
      title: "Import from template",
    });
  }, [openDialog]);

  return <ErrorDialog afterLeave={() => navigate("..")} />;
}
