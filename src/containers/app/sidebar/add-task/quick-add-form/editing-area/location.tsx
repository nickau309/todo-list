import { UpgradeIcon16 } from "@/assets";
import {
  UnlockLocationDialog,
  UnlockLocationDialogButton,
  UnlockLocationDialogPanel,
} from "@/features/unlock-location-dialog";
import clsx from "clsx";

type LocationProps = {
  disabled?: boolean;
};

export default function Location({ disabled = false }: LocationProps) {
  return (
    <UnlockLocationDialog disabled={disabled}>
      <div className="relative flex items-center">
        <UnlockLocationDialogButton
          type="button"
          className={clsx(
            "flex h-7 items-center gap-1 rounded-[5px] border border-input-idle",
            "px-1.5",
            "text-actionable-quaternary-idle-tint",
            "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
            "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <span>
            <UpgradeIcon16
              className={clsx(
                "[&_g_path]:fill-info-promote-primary-idle-tint",
                "[&_path]:fill-info-promote-primary-idle-fill",
              )}
            />
          </span>
          <span
            className={clsx(
              "truncate text-[13px]/[16.8px]",
              "text-display-secondary-idle-tint",
            )}
          >
            Location
          </span>
        </UnlockLocationDialogButton>
      </div>
      <UnlockLocationDialogPanel />
    </UnlockLocationDialog>
  );
}
