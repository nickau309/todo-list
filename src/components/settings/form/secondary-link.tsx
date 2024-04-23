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

type SecondaryLinkProps<R extends string> = {
  children: string;
  href: Route<R>;
} & Omit<LinkProps<R>, "children" | "href">;

export default function SecondaryLink<R extends string>({
  children,
  className,
  href,
  onClick,
  ...props
}: SecondaryLinkProps<R>) {
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
        "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
        "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
        "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
        "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
        className,
      )}
      {...props}
    >
      <span className="truncate text-[13px]/8 font-semibold">{children}</span>
    </Link>
  );
}
