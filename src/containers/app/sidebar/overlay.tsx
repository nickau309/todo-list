import { OVERLAY_VARIANT_LABELS, OVERLAY_VARIANTS } from "@/constants/sidebar";
import { useStore } from "@/contexts/store-context";
import { useWidth } from "@/contexts/width-context";
import { AnimatePresence, motion } from "framer-motion";

export default function Overlay() {
  const showSidebarSm = useStore((state) => state.sidebar.showSidebarSm);
  const setShowSidebarSm = useStore((state) => state.sidebar.setShowSidebarSm);

  const width = useWidth();

  const handleClick = () => {
    setShowSidebarSm(false);
  };

  return (
    <AnimatePresence>
      {showSidebarSm && (
        <motion.div
          initial={OVERLAY_VARIANT_LABELS.hiddenWithoutTransition}
          animate={OVERLAY_VARIANT_LABELS.visible}
          exit={
            width > 750
              ? OVERLAY_VARIANT_LABELS.hiddenWithoutTransition
              : OVERLAY_VARIANT_LABELS.hiddenWithTransition
          }
          variants={OVERLAY_VARIANTS}
          onClick={handleClick}
          className="fixed inset-0 z-20 bg-black/40"
        />
      )}
    </AnimatePresence>
  );
}
