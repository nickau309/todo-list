import React from "react";
import { AddBelowIcon24 } from "@assets";
import { useDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function AddProjectBelow({ id }) {
  const { openDialog } = useDialogControl();

  return (
    <MenuItem as="button" onClick={() => openDialog("AddProjectBelow", id)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <AddBelowIcon24 />
        </span>
        <span className="text-sm/6">Add project below</span>
      </div>
    </MenuItem>
  );
}
