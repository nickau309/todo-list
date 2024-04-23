import { NotificationSmIcon24 } from "@/assets";
import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function SidebarNotifications() {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      href="/app/notifications"
      aria-disabled="false"
      aria-label="Notifications"
      className={clsx(
        "grid size-8 place-items-center rounded-[5px] border border-transparent",
        segment === "notifications" && "bg-selectable-secondary-selected-fill",
        "text-actionable-quaternary-idle-tint transition-colors duration-300",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        segment !== "notifications" &&
          "custom-hocus:bg-selectable-secondary-hover-fill",
        "custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      <NotificationSmIcon24 />
    </Link>
  );
}
