"use client";

import UpgradeIcon from "@/components/settings/upgrade-icon";
import { useConfirmDialogControl } from "@/contexts/confirm-dialog-context";
import { useSetShowNavMenu } from "@/contexts/settings/show-nav-menu-context";
import { useDiscardChanges } from "@/hooks/settings";
import type { NavMenuItemType } from "@/types/settings";
import { CompositeItem } from "@floating-ui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import type { MouseEvent } from "react";
import { useFormContext } from "react-hook-form";

export default function Item({
  description,
  icon,
  segment,
  showUpgradeIcon,
}: NavMenuItemType) {
  const {
    setIsOpen: setIsConfirmDialogOpen,
    setHandleSubmit: setHandleConfirmDialogSubmit,
  } = useConfirmDialogControl();

  const setShowNavMenu = useSetShowNavMenu();

  const discardChanges = useDiscardChanges();

  const router = useRouter();
  const currentSegment = useSelectedLayoutSegment();

  const {
    formState: { isDirty },
    clearErrors,
  } = useFormContext();

  const href = `/app/settings/${segment}` as const;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDirty) {
      const handleSubmit = () => {
        discardChanges();
        setShowNavMenu(false);
        router.push(href);
      };
      e.preventDefault();
      setIsConfirmDialogOpen(true);
      setHandleConfirmDialogSubmit(() => handleSubmit);
    } else {
      clearErrors();
      setShowNavMenu(false);
    }
  };

  const isCurrentPage = currentSegment === segment;

  return (
    <CompositeItem
      render={(props) => (
        <Link
          href={href}
          aria-current={isCurrentPage ? "page" : undefined}
          aria-disabled="false"
          onClick={handleClick}
          className={clsx(
            "group flex h-8 w-full min-w-[68px] shrink-0 items-center gap-1.5 overflow-hidden rounded-[5px] px-1",
            "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
            "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
            "aria-[current=page]:bg-selectable-secondary-selected-fill",
            "[&:not([aria-current=page])]:custom-hocus:bg-selectable-secondary-hover-fill",
          )}
          {...props}
        />
      )}
    >
      <span
        className={clsx(
          "grid size-6 place-items-center",
          "text-display-secondary-idle-tint",
          "group-aria-[current=page]:text-selectable-secondary-selected-tint",
        )}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span
          className={clsx(
            "whitespace-nowrap font-sans text-sm/[18.4px]",
            "group-aria-[current=page]:text-selectable-secondary-selected-tint",
          )}
        >
          {description}
        </span>
        {showUpgradeIcon && <UpgradeIcon />}
      </div>
    </CompositeItem>
  );
}
