import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import equal from "fast-deep-equal";
import type { Route } from "next";
import Link from "next/link";
import type { MouseEvent } from "react";

type LinkProps<R extends string> = {
  children: string;
  disabled?: boolean;
  href: Route<R>;
};

export default function SecondaryLink<R extends string>({
  children,
  disabled = false,
  href,
}: LinkProps<R>) {
  const { inputValues, optimisticSettings } = useSettingsDialogState();
  const { setNextHref } = useSettingsDialogControl();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
    } else if (!equal(optimisticSettings, inputValues)) {
      e.preventDefault();
      setNextHref(href);
    }
  };

  return (
    <Link
      href={href}
      aria-disabled={disabled}
      onClick={handleClick}
      className={clsx(
        "flex h-8 min-w-[68px] select-none items-center justify-center rounded-[5px] border border-transparent",
        "bg-actionable-secondary-idle-fill px-3 text-actionable-secondary-idle-tint",
        "transition-colors duration-300",
        "aria-disabled:cursor-not-allowed aria-disabled:bg-actionable-secondary-disabled-fill aria-disabled:text-actionable-secondary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-secondary-hover-fill custom-hocus:text-actionable-secondary-hover-tint",
      )}
    >
      <span className="truncate text-[13px]/8 font-semibold">{children}</span>
    </Link>
  );
}
