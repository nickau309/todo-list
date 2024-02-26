import React from "react";
import { ProIcon24 } from "@/assets";
import { useErrorDialogControl } from "@/contexts";
import { classNames } from "@/utils";

export default function UpgradeToPro() {
  const { openDialog } = useErrorDialogControl();

  return (
    <button
      type="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-3xl",
          title: "Upgrade to Pro",
        });
      }}
      className={classNames(
        "flex h-7 items-center justify-center gap-0.5 rounded-[5px] border border-transparent bg-navbar-on-idle-fill transition-colors duration-300",
        "focus-visible:bg-navbar-hover-fill",
        "enabled:hover:bg-navbar-hover-fill",
        "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "max-[750px]:w-7 min-[750px]:pl-0.5 min-[750px]:pr-2",
      )}
    >
      <span>
        <ProIcon24 className="fill-[#FFD093] stroke-[#FFD093]" />
      </span>
      <span className="font-reactist text-xs/7 font-semibold max-[750px]:hidden">
        Upgrade to Pro
      </span>
    </button>
  );
}
