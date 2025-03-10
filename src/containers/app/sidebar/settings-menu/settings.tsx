import { Cog8ToothSmIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import { useStore } from "@/contexts/store-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import { useSettingsMenu } from "./settings-menu-context";

type LinkProps = {
  disabled?: boolean;
};

export default function Settings({ disabled = false }: LinkProps) {
  const label = "Settings";

  const { setPrevHref } = useSettingsDialogControl();

  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);
  const setIsSettingsMenuOpen = useStore(
    (state) => state.settingsMenu.setIsOpen,
  );
  const activeIndex = useStore((state) => state.settingsMenu.activeIndex);
  const setIsResourcesMenuOpen = useStore(
    (state) => state.resourcesMenu.setIsOpen,
  );

  const { ref, index } = useListItem({ label });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { getItemProps } = useSettingsMenu("Settings");

  return (
    <Link
      ref={ref}
      aria-disabled={disabled}
      href="/app/settings"
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
            setPrevHref(`${pathname}?${searchParams.toString()}` as Route);
            setIsResourcesMenuOpen(false);
            setIsSettingsMenuOpen(false);
            setShowSidebarSm(false);
          }
        },
        onFocus() {
          if (!disabled) {
            setIsResourcesMenuOpen(false);
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
        <Cog8ToothSmIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <Text
          overflow="truncate"
          font="reactist"
          size="13px"
          height="16.8px"
          color={disabled ? "tertiary" : "primary"}
        >
          {label}
        </Text>
        <div className="flex items-center gap-1">
          <Text
            as="kbd"
            font="sans"
            size="12px"
            height="16px"
            color={disabled ? "tertiary" : "secondary"}
          >
            O
          </Text>
          <Text
            font="reactist"
            size="12px"
            height="15.2px"
            color={disabled ? "tertiary" : "secondary"}
          >
            then
          </Text>
          <Text
            as="kbd"
            font="sans"
            size="12px"
            height="16px"
            color={disabled ? "tertiary" : "secondary"}
          >
            S
          </Text>
        </div>
      </div>
    </Link>
  );
}
