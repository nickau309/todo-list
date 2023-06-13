import React from "react";
import { ReminderIcon16 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { InputButton } from "./components";

export default function ChooseReminders() {
  const { openDialog } = useErrorDialogControl();

  return (
    <InputButton
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Unlock reminders",
        });
      }}
      className="group/reminders"
    >
      <span className="group-hover/reminders:text-quaternary-hover-tint group-focus-visible/reminders:text-quaternary-hover-tint">
        <ReminderIcon16 />
      </span>
      <span className="font-reactist text-[13px]">Reminders</span>
      <span className="select-none rounded-[3px] bg-badge-promote-fill px-1 py-px font-reactist text-[10px]/[13px] font-bold uppercase tracking-widest text-badge-promote-tint">
        Pro
      </span>
    </InputButton>
  );
}
