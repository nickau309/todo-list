import { ProductivityIcon24 } from "@/assets";
import Text from "@/components/ui/text";
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
          <Text
            overflow="truncate"
            font="reactist"
            size="14px"
            weight={700}
            height="17.6px"
            color={disabled ? "tertiary" : "primary"}
          >
            {name}
          </Text>
          <Text
            overflow="truncate"
            font="reactist"
            size="12px"
            height="15.2px"
            color={disabled ? "tertiary" : "secondary"}
          >
            0/5 tasks
          </Text>
        </div>
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
            P
          </Text>
        </div>
      </div>
    </button>
  );
}
