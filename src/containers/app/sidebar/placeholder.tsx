import {
  PLACEHOLDER_VARIANT_LABELS,
  PLACEHOLDER_VARIANTS,
} from "@/constants/sidebar";
import { useSidebarState } from "@/contexts/sidebar-context";
import { useWidth } from "@/contexts/width-context";
import useHasMounted from "@/hooks/use-has-mounted";
import { AnimatePresence, motion } from "framer-motion";

export default function Placeholder() {
  const { showSidebarLg, showSidebarSm, sidebarWidth } = useSidebarState();

  const width = useWidth();

  const hasMounted = useHasMounted();

  return (
    <AnimatePresence>
      {width > 750 && (
        <motion.div
          initial={hasMounted && PLACEHOLDER_VARIANT_LABELS.hidden}
          animate={
            !showSidebarLg
              ? PLACEHOLDER_VARIANT_LABELS.hidden
              : showSidebarSm
                ? PLACEHOLDER_VARIANT_LABELS.visibleWithoutTransition
                : PLACEHOLDER_VARIANT_LABELS.visibleWithTransition
          }
          exit={PLACEHOLDER_VARIANT_LABELS.hidden}
          variants={PLACEHOLDER_VARIANTS}
          custom={sidebarWidth}
          className="h-full"
          style={{ width: sidebarWidth }}
        />
      )}
    </AnimatePresence>
  );
}
