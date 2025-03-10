import { ExtensionIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import { useStore } from "@/contexts/store-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import useIsDirty from "../../../hooks/useIsDirty";
import { useMoreActionsMenu } from "./more-actions-menu";

type ButtonProps = {
  disabled?: boolean;
};

export default function AddExtension({ disabled = false }: ButtonProps) {
  const label = "Add extension…";

  const { setPrevHref } = useSettingsDialogControl();

  const {
    setHandleConfirmDialogSubmit,
    setIsConfirmDialogOpen,
    setIsQuickAddDialogOpen,
  } = useStore((state) => ({
    setHandleConfirmDialogSubmit: state.confirmDialog.setHandleSubmit,
    setIsConfirmDialogOpen: state.confirmDialog.setIsOpen,
    setIsQuickAddDialogOpen: state.quickAddDialog.setIsOpen,
  }));

  const { ref, index } = useListItem({ label });

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isDirty = useIsDirty();

  const {
    setIsOpen: setIsMoreActionMenuOpen,
    activeIndex,
    getItemProps,
  } = useMoreActionsMenu("AddExtension");

  const href = "/app/settings/integrations/browse/collections/ui-extensions";
  if (!disabled) {
    router.prefetch(href);
  }

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
          } else if (isDirty) {
            setIsMoreActionMenuOpen(false);
            setIsConfirmDialogOpen(true);
            setHandleConfirmDialogSubmit(() => {
              setIsQuickAddDialogOpen(false);
              router.push(href);
              setPrevHref(`${pathname}?${searchParams.toString()}` as Route);
            });
          } else {
            setIsMoreActionMenuOpen(false);
            setIsQuickAddDialogOpen(false);
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
