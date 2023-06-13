import React from "react";
import { AddSectionIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function AddSection() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Add section",
        });
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <AddSectionIcon24 />
        </span>
        <span className="text-sm/6">Add section</span>
      </div>
    </MenuItem>
  );
}
