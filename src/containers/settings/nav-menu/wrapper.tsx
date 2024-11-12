import { useSettingsDialogState } from "@/contexts/settings-dialog-context";
import { useWidth } from "@/contexts/width-context";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  const width = useWidth();

  const { showNavMenu } = useSettingsDialogState();

  if (width > 660) {
    return (
      <div
        className={clsx(
          "flex w-[220px] flex-col overflow-hidden",
          "bg-background-base-secondary",
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {showNavMenu && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className={clsx(
            "absolute inset-y-0 left-0 z-10",
            "flex w-full flex-col overflow-hidden",
            "bg-background-base-secondary",
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
