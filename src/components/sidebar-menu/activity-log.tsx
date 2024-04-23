import { ActivityIcon24 } from "@/assets";
import Menu from "@/components/menu";
import clsx from "clsx";
import Link from "next/link";

export default function ActivityLog() {
  const label = "Activity log";

  return (
    <Menu.Item
      as={Link}
      href="/app/activity"
      label={label}
      className={clsx(
        "mx-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
        <ActivityIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-[13px]/[16.8px]">{label}</span>
        <div className="flex items-center gap-1 text-xs text-display-secondary-idle-tint">
          <kbd className="font-sans text-xs">G</kbd>
          <span className="text-xs/[15.2px]">then</span>
          <kbd className="font-sans text-xs">A</kbd>
        </div>
      </div>
    </Menu.Item>
  );
}
