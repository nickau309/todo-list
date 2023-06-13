import React from "react";
import { ReminderIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { AddButton } from "./components";

export default function Reminders({ disabled }) {
  const { openDialog } = useErrorDialogControl();

  return (
    <AddButton
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Unlock reminders",
        });
      }}
      disabled={disabled}
    >
      <span className="mr-3.5">
        <ReminderIcon24 />
      </span>
      <div className="flex min-w-0 grow items-center gap-1 overflow-hidden">
        <span className="select-none truncate text-left font-reactist leading-8">
          Add reminders
        </span>
        <span className="select-none rounded-[3px] bg-badge-promote-fill px-1 py-px font-reactist text-[10px]/[13px] font-bold uppercase tracking-widest text-badge-promote-tint">
          Pro
        </span>
      </div>
    </AddButton>
  );
}
