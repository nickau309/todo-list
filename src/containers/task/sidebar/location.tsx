import { LockIcon24 } from "@/assets";
import UpgradeIcon from "@/components/upgrade-icon";
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
    <div className="-mx-2 flex flex-col">
      <UnlockLocationDialog disabled={disabled}>
        <UnlockLocationDialogButton
          type="button"
          className={clsx(
            "group flex h-7 min-w-[68px] select-none items-center gap-0.5 rounded-[5px] border border-transparent pl-2 pr-0.5",
            "text-actionable-quaternary-idle-tint",
            "transition-colors duration-300",
            "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
            "custom-hocus:bg-selectable-secondary-selected-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <span className="truncate pl-px text-xs/7 font-semibold">
              Location
            </span>
            <UpgradeIcon />
          </div>
          <span>
            <LockIcon24 />
          </span>
        </UnlockLocationDialogButton>
        <UnlockLocationDialogPanel />
      </UnlockLocationDialog>
    </div>
  );
}
