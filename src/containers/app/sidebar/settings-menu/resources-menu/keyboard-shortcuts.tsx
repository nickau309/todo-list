import { KeyboardIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useStore } from "@/contexts/store-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useResourcesMenu } from "./resources-menu-context";

type ButtonProps = {
  disabled?: boolean;
};

export default function KeyboardShortcuts({ disabled }: ButtonProps) {
  const label = "Keyboard shortcuts";

  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);
  const setIsSettingsMenuOpen = useStore(
    (state) => state.settingsMenu.setIsOpen,
  );
  const setIsResourcesMenuOpen = useStore(
    (state) => state.resourcesMenu.setIsOpen,
  );
  const activeIndex = useStore((state) => state.resourcesMenu.activeIndex);
  const setHasFocusInside = useStore(
    (store) => store.resourcesMenu.setHasFocusInside,
  );

  const { ref, index } = useListItem({ label });

  const { getItemProps } = useResourcesMenu("KeyboardShortcuts");

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
        <KeyboardIcon24 />
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
            ?
          </Text>
        </div>
      </div>
    </button>
  );
}
