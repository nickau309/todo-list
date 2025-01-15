import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import { useStore } from "@/contexts/store-context";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import useIsDirty from "../../../hooks/useIsDirty";
import { useMoreActionsMenu } from "./more-actions-menu";

type LinkProps = {
  disabled?: boolean;
};

export default function EditTaskActions({ disabled = false }: LinkProps) {
  const label = "Edit task actions";

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
  } = useMoreActionsMenu("EditTaskActions");

  const href = "/app/settings/quick-customization";

  return (
    <Link
      ref={ref}
      aria-disabled={disabled}
      href={href}
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
          } else if (isDirty) {
            e.preventDefault();
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
            setPrevHref(`${pathname}?${searchParams.toString()}` as Route);
          }
        },
      })}
    >
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span
          className={clsx(
            "truncate text-[13px]/[16.8px] text-display-accent-primary-fill",
            "group-aria-disabled:text-display-tertiary-idle-tint",
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
