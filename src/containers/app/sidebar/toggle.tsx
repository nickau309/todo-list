import { SidebarIcon24 } from "@/assets";
import { SIDEBAR_TRANSITION } from "@/constants/sidebar";
import { useSidebarControl, useSidebarState } from "@/contexts/sidebar-context";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function Toggle() {
  const { showSidebar } = useSidebarState();
  const { setShowSidebar } = useSidebarControl();

  const handleClick = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  return (
    <motion.button
      initial={false}
      animate={{ marginRight: showSidebar ? 0 : -60 }}
      transition={SIDEBAR_TRANSITION}
      type="button"
      aria-disabled="false"
      aria-label="Open/close sidebar"
      onClick={handleClick}
      className={clsx(
        "absolute right-0",
        "grid size-8 shrink-0 place-items-center rounded-[5px] border border-transparent",
        "text-actionable-quaternary-idle-tint",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-selectable-secondary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      <SidebarIcon24 />
    </motion.button>
  );
}
