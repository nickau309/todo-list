import { LogOutIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useStore } from "@/contexts/store-context";
import { logOut } from "@/lib/actions";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { mutate } from "swr";
import { useSettingsMenu } from "./settings-menu-context";

type ButtonProps = {
  disabled?: boolean;
};

export default function LogOut({ disabled = false }: ButtonProps) {
  const label = "Log out";

  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);
  const setIsSettingsMenuOpen = useStore(
    (state) => state.settingsMenu.setIsOpen,
  );
  const activeIndex = useStore((state) => state.settingsMenu.activeIndex);
  const setIsResourcesMenuOpen = useStore(
    (state) => state.resourcesMenu.setIsOpen,
  );

  const { ref, index } = useListItem({ label });

  const { getItemProps } = useSettingsMenu("LogOut");

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
            void mutate(
              () => true, // which cache keys are updated
              undefined, // update cache data to `undefined`
              { revalidate: false }, // do not revalidate
            );
            void logOut();
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
        <LogOutIcon24 />
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
      </div>
    </button>
  );
}
