"use client";

import { SIDEBAR_TRANSITION } from "@/constants/sidebar";
import { useSidebarState } from "@/contexts/sidebar-context";
import { motion } from "framer-motion";
import Notifications from "./notifications";
import Overlay from "./overlay";
import Placeholder from "./placeholder";
import Resizer from "./resizer";
import SettingsMenu from "./settings-menu";
import Toggle from "./toggle";

export default function Sidebar() {
  const { showSidebar, sidebarWidth } = useSidebarState();

  return (
    <>
      <Placeholder />
      <Overlay />
      <motion.div
        initial={false}
        animate={{ marginLeft: showSidebar ? 0 : -sidebarWidth }}
        transition={SIDEBAR_TRANSITION}
        className="fixed left-0 top-0 z-20 h-full bg-background-base-secondary"
        style={{ width: sidebarWidth }}
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between p-3">
            <div className="ml-[-3px] max-w-[calc(85%-40px)]">
              <SettingsMenu />
            </div>
            <div className="relative flex pr-10">
              <Notifications />
              <Toggle />
            </div>
          </div>
          <div>bla</div>
        </div>
        <Resizer />
      </motion.div>
    </>
  );
}
