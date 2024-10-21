import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

export default function CompactHeader({ show }: { show: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-center overflow-hidden",
        "[grid-area:center]",
      )}
    >
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(100%)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={{ opacity: 0, transform: "translateY(100%)" }}
            transition={{ ease: "easeOut", duration: 0.1 }}
            className="flex min-w-0 flex-1 justify-center"
          >
            <h1 className="truncate pr-1 text-base/5 font-bold">Inbox</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
