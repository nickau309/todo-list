import React from "react";
import { PrintIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function Print() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Print",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <PrintIcon24 />
        </span>
        <span className="text-[13px]/8">Print</span>
      </div>
    </MenuItem>
  );
}
