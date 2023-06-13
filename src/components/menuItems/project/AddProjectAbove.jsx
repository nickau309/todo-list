import React from "react";
import { AddAboveIcon24 } from "@assets";
import { useDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function AddProjectAbove({ id }) {
  const { openDialog } = useDialogControl();

  return (
    <MenuItem as="button" onClick={() => openDialog("AddProjectAbove", id)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <AddAboveIcon24 />
        </span>
        <span className="text-sm/6">Add project above</span>
      </div>
    </MenuItem>
  );
}
