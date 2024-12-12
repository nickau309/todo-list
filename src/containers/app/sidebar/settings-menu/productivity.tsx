import { ProductivityIcon24 } from "@/assets";
import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import { useStore } from "@/contexts/store-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useSettingsMenu } from "./settings-menu-context";

type ButtonProps = {
  disabled?: boolean;
};

export default function Productivity({ disabled = false }: ButtonProps) {
  const { name } = useOptimisticUser();

  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);
  const setIsSettingsMenuOpen = useStore(
    (state) => state.settingsMenu.setIsOpen,
  );
  const activeIndex = useStore((state) => state.settingsMenu.activeIndex);
  const setIsResourcesMenuOpen = useStore(
    (state) => state.resourcesMenu.setIsOpen,
  );

  const { ref, index } = useListItem({ label: name });

  const { getItemProps } = useSettingsMenu("Productivity");

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
        <ProductivityIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-1 py-1 text-left">
          <span
            className={clsx(
              "truncate text-sm/[17.6px] font-bold text-display-primary-idle-tint",
              "group-aria-disabled:text-display-tertiary-idle-tint",
            )}
          >
            {name}
          </span>
          <span
            className={clsx(
              "text-xs/[15.2px] text-display-secondary-idle-tint",
              "group-aria-disabled:text-display-tertiary-idle-tint",
            )}
          >
            0/5 tasks
          </span>
        </div>
        <div
          className={clsx(
            "flex items-center gap-1 text-xs text-display-secondary-idle-tint",
            "group-aria-disabled:text-display-tertiary-idle-tint",
          )}
        >
          <kbd className="font-sans text-xs">O</kbd>
          <span className="text-xs/[15.2px]">then</span>
          <kbd className="font-sans text-xs">P</kbd>
        </div>
      </div>
    </button>
  );
}
