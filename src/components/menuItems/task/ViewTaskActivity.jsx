import React from "react";
import { ActivityIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function ViewTaskActivity() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[580px]",
          title: "Task activity",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <ActivityIcon24 />
        </span>
        <span className="text-[13px]/[16.8px]">View task activity</span>
      </div>
    </MenuItem>
  );
}
