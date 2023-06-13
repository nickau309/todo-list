import React from "react";
import { KeyboardIcon24 } from "@assets";
import { useDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function KeyboardShortcuts() {
  const { openDialog } = useDialogControl();

  return (
    <MenuItem as="button" onClick={() => openDialog("KeyboardShortcuts")}>
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <KeyboardIcon24 className="fill-current" />
        </span>
        <span className="text-[13px]/8">Keyboard shortcuts</span>
      </div>
    </MenuItem>
  );
}
