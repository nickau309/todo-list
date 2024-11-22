import { GuideIcon24 } from "@/assets";
import { useSidebarControl } from "@/contexts/sidebar-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useResourcesMenu } from "./resources-menu-context";

type LinkProps = {
  disabled?: boolean;
};

export default function GettingStartedGuide({ disabled = false }: LinkProps) {
  const label = "Getting started guide";

  const { setIsResourcesMenuOpen, setIsSettingsMenuOpen, setShowSidebarSm } =
    useSidebarControl();

  const { ref, index } = useListItem({ label });

  const { setHasFocusInside, activeIndex, getItemProps } = useResourcesMenu(
    "GettingStartedGuide",
  );

  return (
    <Link
      ref={ref}
      aria-disabled={disabled}
      href="/getting-started"
      role="menuitem"
      tabIndex={!disabled && activeIndex === index ? 0 : -1}
      className={clsx(
        "group",
        "flex min-h-8 w-full select-none items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed",
        "custom-hocus:bg-actionable-focus-fill",
      )}
      {...getItemProps({
        onClick(e: MouseEvent<HTMLAnchorElement>) {
          if (disabled) {
            e.preventDefault();
          } else {
            setIsResourcesMenuOpen(false);
            setIsSettingsMenuOpen(false);
            setShowSidebarSm(false);
          }
        },
        onFocus() {
          if (!disabled) {
            setHasFocusInside(true);
          }
        },
      })}
    >
      <span
        className={clsx(
          "grid size-6 place-items-center text-display-secondary-idle-tint",
          "group-aria-disabled:opacity-50",
        )}
      >
        <GuideIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span
          className={clsx(
            "truncate text-[13px]/[16.8px] text-display-primary-idle-tint",
            "group-aria-disabled:text-display-tertiary-idle-tint",
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
