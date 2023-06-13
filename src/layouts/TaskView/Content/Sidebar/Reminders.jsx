import React from "react";
import { LockIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { AddButton } from "./components";

export default function Reminders({ disabled }) {
  const { openDialog } = useErrorDialogControl();

  return (
    <div className="flex flex-col">
      <AddButton
        onClick={() => {
          openDialog({
            maxWidth: "max-w-[450px]",
            title: "Unlock reminders",
          });
        }}
        disabled={disabled}
      >
        <div className="flex h-full grow items-center gap-1">
          <span className="select-none pl-px font-reactist text-xs font-semibold text-content-secondary">
            Reminders
          </span>
          <span className="select-none rounded-[3px] bg-badge-promote-fill px-1 py-px font-reactist text-[10px]/[13px] font-bold uppercase tracking-widest text-badge-promote-tint">
            Pro
          </span>
        </div>
        <span className="-mr-1.5 ml-0.5">
          <LockIcon24 />
        </span>
      </AddButton>
    </div>
  );
}
