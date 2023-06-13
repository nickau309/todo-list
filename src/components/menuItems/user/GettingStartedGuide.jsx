import React from "react";
import { GuideIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function GettingStartedGuide() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Getting started guide",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <GuideIcon24 />
        </span>
        <span className="text-[13px]/8">Getting started guide</span>
      </div>
    </MenuItem>
  );
}
