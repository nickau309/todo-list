"use client";

import { useConfirmDialogControl } from "@/contexts/confirm-dialog-context";
import { useDiscardChanges } from "@/hooks/settings";
import clsx from "clsx";
import type { Route } from "next";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useFormContext } from "react-hook-form";

type QuaternaryLinkProps<R extends string> = {
  href: Route<R>;
} & Omit<LinkProps<R>, "href">;

export default function QuaternaryLink<R extends string>({
  className,
  href,
  onClick,
  ...props
}: QuaternaryLinkProps<R>) {
  const {
    setIsOpen: setIsConfirmDialogOpen,
    setHandleSubmit: setHandleConfirmDialogSubmit,
  } = useConfirmDialogControl();

  const discardChanges = useDiscardChanges();

  const router = useRouter();

  const {
    formState: { isDirty },
    clearErrors,
  } = useFormContext();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDirty) {
      const handleSubmit = () => {
        discardChanges();
        router.push(href);
      };
      e.preventDefault();
      setIsConfirmDialogOpen(true);
      setHandleConfirmDialogSubmit(() => handleSubmit);
    } else {
      clearErrors();
    }
    onClick?.(e);
  };

  return (
    <Link
      href={href}
      aria-disabled="false"
      onClick={handleClick}
      className={clsx(
        "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
        "text-actionable-quaternary-idle-tint",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
        className,
      )}
      {...props}
    />
  );
}
