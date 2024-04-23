import Menu from "@/components/menu";
import clsx from "clsx";
import Link from "next/link";

export default function WhatsNew() {
  const label = "What's new";

  return (
    <Menu.Item
      as={Link}
      href="/help/articles/whats-new"
      label={label}
      className={clsx(
        "mr-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-3",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="truncate text-[13px]/[16.8px]">{label}</span>
    </Menu.Item>
  );
}
