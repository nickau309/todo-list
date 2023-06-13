import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ConfirmDialog,
  ErrorDialog,
  QuickAddDialog,
} from "@components/dialogs";
import {
  useSetShowSidebarSm,
  useShowSidebar,
  useTheme,
  useWidth,
} from "@contexts";
import { classNames } from "@utils";
import Dialogs from "./Dialogs";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function RootView() {
  const setShowSidebarSm = useSetShowSidebarSm();
  const showSidebar = useShowSidebar();
  const { className } = useTheme();
  const width = useWidth();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => setShowSidebarSm(false)}
      className={classNames(
        "flex h-screen flex-col overflow-hidden bg-base",
        className
      )}
    >
      <div className="z-30 shrink-0 basis-11">
        <Topbar />
      </div>
      <div className="min-h-0 grow">
        <div className="relative h-full">
          <div
            className={classNames(
              "fixed inset-x-0 bottom-0 top-11 z-20 bg-black/50 transition-opacity duration-[250ms]",
              width < 751 && showSidebar
                ? "opacity-100"
                : "pointer-events-none opacity-0",
              "min-[751px]:hidden"
            )}
          ></div>
          <motion.div
            animate={{ left: showSidebar ? "0px" : "-425px" }}
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.25 }}
            className="absolute bottom-0 top-0 z-20 w-[305px]"
          >
            <Sidebar showSidebar={showSidebar} />
          </motion.div>
          <motion.main
            initial={false}
            animate={{
              marginLeft: width >= 751 && showSidebar ? "305px" : "0px",
            }}
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.25 }}
            className="h-full"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
      <ConfirmDialog />
      <Dialogs />
      <ErrorDialog />
      <QuickAddDialog />
    </div>
  );
}
