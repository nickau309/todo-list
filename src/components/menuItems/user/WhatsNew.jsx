import React from "react";
import { BubbleIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function WhatsNew() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "What's new",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <BubbleIcon24 />
        </span>
        <span className="text-[13px]/8">What&apos;s new</span>
      </div>
    </MenuItem>
  );
}
