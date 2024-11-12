import { AddLgIcon24 } from "@/assets";
import clsx from "clsx";

export default function AddTeamButton() {
  return (
    <button
      type="button"
      aria-disabled="true"
      className={clsx(
        "flex h-8 min-w-[68px] select-none items-center gap-1.5 rounded-[5px] border border-transparent pl-1.5 pr-3",
        "text-actionable-quaternary-idle-tint",
        "transition-colors duration-300",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      <span>
        <AddLgIcon24 />
      </span>
      <span className="truncate text-[13px]/8 font-semibold">Add team</span>
    </button>
  );
}
