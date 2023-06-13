import React from "react";
import { LogOutIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function LogOut() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Log out",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <LogOutIcon24 />
        </span>
        <span className="text-[13px]/8">Log out</span>
      </div>
    </MenuItem>
  );
}
