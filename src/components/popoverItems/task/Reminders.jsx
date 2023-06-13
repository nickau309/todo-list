import React from "react";
import { Popover } from "@headlessui/react";
import { ReminderIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { Button } from "./components";

export default function Reminders() {
  const { openDialog } = useErrorDialogControl();

  return (
    <Popover.Button
      as={Button}
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Unlock reminders",
        });
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ReminderIcon24 />
        </span>
        <div className="flex grow items-center gap-1">
          <span className="text-sm/6">Reminders</span>
          <span className="select-none rounded-[3px] bg-badge-promote-fill px-1 py-px font-reactist text-[10px]/[13px] font-bold uppercase tracking-widest text-badge-promote-tint">
            Pro
          </span>
        </div>
      </div>
    </Popover.Button>
  );
}
