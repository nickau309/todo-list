import React from "react";
import { EditIcon24 } from "@assets";
import { useDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function EditProject({ id }) {
  const { openDialog } = useDialogControl();

  return (
    <MenuItem as="button" onClick={() => openDialog("EditProject", id)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <EditIcon24 />
        </span>
        <span className="text-sm/6">Edit project</span>
      </div>
    </MenuItem>
  );
}
