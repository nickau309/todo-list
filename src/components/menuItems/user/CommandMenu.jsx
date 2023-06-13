import React from "react";
import { CommandIcon62 } from "@assets";
import { useDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function CommandMenu() {
  const { openDialog } = useDialogControl();

  return (
    <MenuItem as="button" onClick={() => openDialog("CommandMenu")}>
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <CommandIcon62 className="h-6 w-6" />
        </span>
        <span className="text-[13px]/8">Command menu</span>
      </div>
    </MenuItem>
  );
}
