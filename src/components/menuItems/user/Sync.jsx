import React from "react";
import { SyncIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function Sync() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Sync",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <SyncIcon24 />
        </span>
        <span className="text-[13px]/8">Sync</span>
      </div>
    </MenuItem>
  );
}
