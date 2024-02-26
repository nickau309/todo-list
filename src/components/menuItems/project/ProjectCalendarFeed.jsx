import React from "react";
import { ProjectListIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function ProjectCalendarFeed() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[580px]",
          title: "Project calendar feed",
        });
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ProjectListIcon24 />
        </span>
        <span className="text-sm/6">Project calendar feed</span>
      </div>
    </MenuItem>
  );
}
