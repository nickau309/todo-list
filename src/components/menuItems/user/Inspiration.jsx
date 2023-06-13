import React from "react";
import { EditIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function Inspiration() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Inspiration",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <EditIcon24 />
        </span>
        <span className="text-[13px]/8">Inspiration</span>
      </div>
    </MenuItem>
  );
}
