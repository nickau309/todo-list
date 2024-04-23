"use client";

import { useShowNavMenu } from "@/contexts/settings/show-nav-menu-context";
import { useWidth } from "@/contexts/width-context";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  const showNavMenu = useShowNavMenu();

  const width = useWidth();

  if (width > 660) {
    return (
      <div className="flex w-[220px] flex-col overflow-hidden bg-background-base-secondary">
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {showNavMenu && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={clsx(
            "absolute inset-y-0 left-0 z-10",
            "flex flex-col overflow-hidden bg-background-base-secondary",
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
