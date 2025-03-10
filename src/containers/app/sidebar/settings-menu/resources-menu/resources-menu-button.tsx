import { ChevronRightIcon24, ResourceIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useStore } from "@/contexts/store-context";
import { useListItem, useMergeRefs } from "@floating-ui/react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useSettingsMenu } from "../settings-menu-context";
import { useResourcesMenu } from "./resources-menu-context";

export default function ResourcesMenuButton() {
  const label = "Resources";

  const activeIndex = useStore((state) => state.settingsMenu.activeIndex);
  const setHasFocusInside = useStore(
    (state) => state.resourcesMenu.setHasFocusInside,
  );

  const item = useListItem({ label });

  const { getItemProps } = useSettingsMenu("ResourcesMenuButton");

  const { disabled, refs, getReferenceProps } = useResourcesMenu(
    "ResourcesMenuButton",
  );

  const ref = useMergeRefs([refs.setReference, item.ref]);

  return (
    <button
      ref={ref}
      aria-disabled={disabled}
      tabIndex={!disabled && activeIndex === item.index ? 0 : -1}
      className={clsx(
        "group",
        "flex min-h-8 w-full select-none items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed",
        "custom-hocus:bg-actionable-focus-fill",
      )}
      {...getReferenceProps(
        getItemProps({
          onClick(e: MouseEvent<HTMLButtonElement>) {
            if (disabled) {
              e.preventDefault();
            }
          },
          onFocus() {
            if (!disabled) {
              setHasFocusInside(false);
            }
          },
        }),
      )}
    >
      <span
        className={clsx(
          "grid size-6 place-items-center text-display-secondary-idle-tint",
          "group-aria-disabled:opacity-50",
        )}
      >
        <ResourceIcon24 />
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
        <span
          className={clsx(
            "grid size-6 place-items-center text-display-secondary-idle-tint",
            "group-aria-disabled:opacity-50",
          )}
        >
          <ChevronRightIcon24 />
        </span>
      </div>
    </button>
  );
}
