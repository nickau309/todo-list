import React from "react";
import { EmailIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function AddCommentsViaEmail() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[580px]",
          title: "Email comments to this task",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <EmailIcon24 />
        </span>
        <span className="text-[13px]/[16.8px]">Add comments via email</span>
      </div>
    </MenuItem>
  );
}
