import { useSidebarControl } from "@/contexts/sidebar-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useId } from "react";
import { useSettingsMenu } from "./settings-menu-context";

type ButtonProps = {
  disabled?: boolean;
};

export default function Version({ disabled = false }: ButtonProps) {
  const label = "v7211";

  const { setIsResourcesMenuOpen, setIsSettingsMenuOpen, setShowSidebarSm } =
    useSidebarControl();

  const { ref, index } = useListItem({ label });

  const descriptionId = useId();

  const { activeIndex, getItemProps } = useSettingsMenu("Version");

  return (
    <button
      ref={ref}
      aria-describedby={descriptionId}
      aria-disabled={disabled}
      role="menuitem"
      tabIndex={!disabled && activeIndex === index ? 0 : -1}
      className={clsx(
        "group",
        "flex min-h-8 w-fit select-none items-center gap-2.5 rounded-[5px] px-3",
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
          "truncate text-[13px]/[16.8px] text-display-primary-idle-tint",
          "group-aria-disabled:text-display-tertiary-idle-tint",
        )}
      >
        {label}
      </span>
      <span id={descriptionId} className="sr-only">
        Press enter to copy version number
      </span>
    </button>
  );
}
