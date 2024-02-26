import React from "react";
import { BusinessIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { MenuItem } from "./components";

export default function UpgradeToBusiness() {
  const { openDialog } = useErrorDialogControl();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Upgrade to Business",
        });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <BusinessIcon24 />
        </span>
        <span className="text-[13px]/8">Upgrade to Business</span>
      </div>
    </MenuItem>
  );
}
