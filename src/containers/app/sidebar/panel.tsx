import { SIDEBAR_TRANSITION } from "@/constants/sidebar";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSidebarState } from "./contexts/sidebar-context";
import useShowSidebar from "./hooks/use-show-sidebar";

type PanelProps = {
  children: ReactNode;
};

export default function Panel({ children }: PanelProps) {
  const { sidebarWidth } = useSidebarState();

  const showSidebar = useShowSidebar();

  return (
    <motion.div
      initial={false}
      animate={{ marginLeft: showSidebar ? 0 : -sidebarWidth }}
      transition={SIDEBAR_TRANSITION}
      className="fixed left-0 top-0 z-20 h-full bg-background-base-secondary"
      style={{ width: sidebarWidth }}
    >
      {children}
    </motion.div>
  );
}
