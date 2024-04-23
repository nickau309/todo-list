import { GuideIcon24 } from "@/assets";
import Menu from "@/components/menu";
import clsx from "clsx";
import Link from "next/link";

export default function GettingStartedGuide() {
  const label = "Getting started guide";

  return (
    <Menu.Item
      as={Link}
      href="/getting-started"
      label={label}
      className={clsx(
        "mx-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
        <GuideIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-[13px]/[16.8px]">{label}</span>
      </div>
    </Menu.Item>
  );
}
