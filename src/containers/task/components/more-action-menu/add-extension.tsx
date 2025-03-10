import { ExtensionIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMoreActionMenu } from "./more-action-menu";

export default function AddExtension() {
  const { setPrevHref } = useSettingsDialogControl();

  const label = "Add extension…";
  const { ref, index } = useListItem({ label });

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    setIsOpen: setIsMoreActionMenuOpen,
    activeIndex,
    disabledIndices,
    getItemProps,
  } = useMoreActionMenu("AddExtension");

  const disabled = disabledIndices.includes(index);
  const href = "/app/settings/integrations/browse/collections/ui-extensions";
  if (!disabled) {
    router.prefetch(href);
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={disabled}
      role="menuitem"
      tabIndex={!disabled && activeIndex === index ? 0 : -1}
      className={clsx(
        "group mx-1.5 flex min-h-8 select-none items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "aria-disabled:cursor-not-allowed",
        "custom-hocus:bg-actionable-focus-fill",
      )}
      {...getItemProps({
        onClick() {
          if (!disabled) {
            setIsMoreActionMenuOpen(false);
            router.push(href);
            setPrevHref(`${pathname}?${searchParams.toString()}` as Route);
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
        <ExtensionIcon24 />
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
