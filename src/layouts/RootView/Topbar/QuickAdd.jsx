import React from "react";
import { AddLgIcon24 } from "@/assets";
import { useQuickAddDialogControl } from "@/contexts";
import { classNames } from "@/utils";

export default function QuickAdd() {
  const { openDialog } = useQuickAddDialogControl();

  return (
    <button
      type="button"
      aria-label="Quick Add"
      onClick={openDialog}
      className={classNames(
        "grid aspect-square w-8 place-items-center rounded-[3px]",
        "hover:bg-navbar-hover-fill",
        "ui-open:bg-navbar-hover-fill",
      )}
    >
      <AddLgIcon24 />
    </button>
  );
}
