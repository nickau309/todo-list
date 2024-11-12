import { ArrowLeftIcon24 } from "@/assets";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import clsx from "clsx";
import equal from "fast-deep-equal";
import Link from "next/link";
import type { MouseEvent } from "react";

export default function GoBackLink() {
  const { inputValues, optimisticSettings } = useSettingsDialogState();
  const { setNextHref } = useSettingsDialogControl();

  const href = "/app/settings";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!equal(optimisticSettings, inputValues)) {
      e.preventDefault();
      setNextHref(href);
    }
  };

  return (
    <Link
      href={href}
      aria-disabled="false"
      aria-label="Go back"
      onClick={handleClick}
      className={clsx(
        "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
        "text-actionable-quaternary-idle-tint",
        "transition-colors duration-300",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      <ArrowLeftIcon24 />
    </Link>
  );
}
