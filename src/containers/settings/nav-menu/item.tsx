import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import type { NavMenuItemType } from "@/types/settings";
import { CompositeItem } from "@floating-ui/react";
import clsx from "clsx";
import equal from "fast-deep-equal";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { MouseEvent } from "react";

export default function Item({
  description,
  icon,
  segment,
}: Omit<NavMenuItemType, "showUpgradeIcon">) {
  const { inputValues, optimisticSettings } = useSettingsDialogState();
  const { setNextHref, setShowNavMenu } = useSettingsDialogControl();

  const currentSegment = useSelectedLayoutSegment();

  const href = `/app/settings/${segment}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!equal(optimisticSettings, inputValues)) {
      e.preventDefault();
      setNextHref(href);
    }
    setShowNavMenu(false);
  };

  const isCurrentPage = currentSegment === segment;

  return (
    <CompositeItem
      render={(props) => (
        <Link
          href={href}
          aria-current={isCurrentPage ? "page" : undefined}
          aria-disabled="false"
          onClick={handleClick}
          className={clsx(
            "flex h-8 min-w-[68px] select-none items-center gap-1.5 rounded-[5px] border border-transparent pl-1.5 pr-3",
            isCurrentPage
              ? "bg-selectable-secondary-selected-fill text-selectable-secondary-selected-tint"
              : "text-actionable-quaternary-idle-tint",
            "transition-colors duration-300",
            !isCurrentPage &&
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
            "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
            !isCurrentPage &&
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
          )}
          {...props}
        />
      )}
    >
      <span>{icon}</span>
      <span
        className={clsx(
          "truncate text-sm/8",
          !isCurrentPage && "text-display-primary-idle-tint",
        )}
      >
        {description}
      </span>
    </CompositeItem>
  );
}
