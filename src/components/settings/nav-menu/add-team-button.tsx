"use client";

import { AddLgIcon24 } from "@/assets";
import { useSetIsOpen } from "@/contexts/add-team-dialog-context";
import clsx from "clsx";

export default function AddTeamButton() {
  const setIsOpen = useSetIsOpen();

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <button
      type="button"
      aria-disabled="false"
      onClick={openDialog}
      className={clsx(
        "flex h-8 w-full min-w-[68px] items-center gap-1.5 overflow-hidden rounded-[5px] border border-transparent px-1",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-selectable-secondary-selected-fill",
      )}
    >
      <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
        <AddLgIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span className="whitespace-nowrap text-sm/[17.6px]">Add team</span>
      </div>
    </button>
  );
}
