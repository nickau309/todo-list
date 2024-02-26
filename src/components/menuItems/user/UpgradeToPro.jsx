import React from "react";
import { ProIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function UpgradeToPro() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-3xl",
          title: "Upgrade to Pro",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <ProIcon24 className="fill-[#FEBA07]/10 stroke-[#ED9D04]" />
        </span>
        <span className="text-[13px]/8">Upgrade to Pro</span>
      </div>
    </MenuItem>
  );
}
