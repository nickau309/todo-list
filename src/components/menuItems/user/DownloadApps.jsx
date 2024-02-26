import React from "react";
import { AppIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function DownloadApps() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Download Apps",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <AppIcon24 />
        </span>
        <span className="text-[13px]/8">Download apps</span>
      </div>
    </MenuItem>
  );
}
