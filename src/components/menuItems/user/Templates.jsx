import React from "react";
import { TemplateIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function Templates() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Templates",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <TemplateIcon24 className="fill-current" />
        </span>
        <span className="text-[13px]/8">Templates</span>
      </div>
    </MenuItem>
  );
}
