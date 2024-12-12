import {
  PLACEHOLDER_VARIANT_LABELS,
  PLACEHOLDER_VARIANTS,
} from "@/constants/sidebar";
import { useStore } from "@/contexts/store-context";
import { useWidth } from "@/contexts/width-context";
import useHasMounted from "@/hooks/use-has-mounted";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebarState } from "./contexts/sidebar-context";

export default function Placeholder() {
  const showSidebarLg = useStore((state) => state.sidebar.showSidebarLg);
  const showSidebarSm = useStore((state) => state.sidebar.showSidebarSm);

  const width = useWidth();

  const hasMounted = useHasMounted();

  const { sidebarWidth } = useSidebarState();

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
