import Menu from "@/components/menu";
import clsx from "clsx";
import { useId } from "react";

export default function Version() {
  const descriptionId = useId();

  const label = "v5801";

  return (
    <Menu.Item
      label={label}
      aria-describedby={descriptionId}
      className={clsx(
        "ml-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-3",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="truncate text-[13px]/[16.8px]">{label}</span>
      <span id={descriptionId} className="sr-only">
        Press enter to copy version number
      </span>
    </Menu.Item>
  );
}
