import { PrintIcon24 } from "@/assets";
import { useStore } from "@/contexts/store-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useSettingsMenu } from "./settings-menu-context";

type ButtonProps = {
  disabled?: boolean;
};

export default function Print({ disabled = false }: ButtonProps) {
  const label = "Print";

  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);
  const setIsSettingsMenuOpen = useStore(
    (state) => state.settingsMenu.setIsOpen,
  );
  const activeIndex = useStore((state) => state.settingsMenu.activeIndex);
  const setIsResourcesMenuOpen = useStore(
    (state) => state.resourcesMenu.setIsOpen,
  );

  const { ref, index } = useListItem({ label });

  const { getItemProps } = useSettingsMenu("Print");

  return (
    <button
      ref={ref}
      aria-disabled={disabled}
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
        onClick(e: MouseEvent<HTMLButtonElement>) {
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
        <PrintIcon24 />
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
        <div
          className={clsx(
            "flex items-center gap-1 text-xs text-display-secondary-idle-tint",
            "group-aria-disabled:text-display-tertiary-idle-tint",
          )}
        >
          <kbd className="font-sans text-xs">Ctrl</kbd>
          <kbd className="font-sans text-xs">P</kbd>
        </div>
      </div>
    </button>
  );
}
