import { MoreActionIcon24 } from "@/assets";
import clsx from "clsx";
import {
  MoreActionMenu,
  MoreActionMenuButton,
  MoreActionMenuPanel,
} from "../components/more-action-menu";

export default function MoreAction() {
  return (
    <MoreActionMenu>
      <MoreActionMenuButton
        type="button"
        aria-label="More actions"
        className={clsx(
          "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
          "text-actionable-quaternary-idle-tint",
          "transition-colors duration-300",
          "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
          "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
          "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
        )}
      >
        <MoreActionIcon24 />
      </MoreActionMenuButton>
      <MoreActionMenuPanel />
    </MoreActionMenu>
  );
}
