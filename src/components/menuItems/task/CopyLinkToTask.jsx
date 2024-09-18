import React from "react";
import { Link1Icon24 } from "@/assets";
import { MenuItem } from "./components";

export default function CopyLinkToTask({ id, projectId }) {
  return (
    <MenuItem
      as="button"
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/todo-list/project/${projectId}/task/${id}`,
        );
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <Link1Icon24 />
        </span>
        <span className="text-[13px]/[16.8px]">Copy link to task</span>
      </div>
    </MenuItem>
  );
}
