import React from "react";
import { PrintIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function PrintTask() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Print task",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <PrintIcon24 />
        </span>
        <span className="text-[13px]/[16.8px]">Print task</span>
      </div>
    </MenuItem>
  );
}
