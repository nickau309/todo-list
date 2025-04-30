import Heading1 from "@/components/ui/heading1";
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
            <div className="flex pr-1">
              <Heading1
                overflow="truncate"
                font="reactist"
                size="16px"
                weight={700}
                height="20px"
                color="primary"
              >
                Inbox
              </Heading1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
