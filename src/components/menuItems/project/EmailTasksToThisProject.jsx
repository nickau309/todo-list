import React from "react";
import { EmailIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function EmailTasksToThisProject() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[580px]",
          title: "Email tasks to this project",
        });
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <EmailIcon24 />
        </span>
        <span className="text-sm/6">Email tasks to this project</span>
      </div>
    </MenuItem>
  );
}
