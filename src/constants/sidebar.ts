import type { Variants } from "framer-motion";

export const INIT_SIDEBAR_WIDTH = 280;

export const MAX_SIDEBAR_WIDTH = 420;

export const MIN_SIDEBAR_WIDTH = 210;

export const SIDEBAR_TRANSITION = {
  ease: [0.4, 0, 0.2, 1],
  duration: 0.3,
};

export const OVERLAY_VARIANT_LABELS = {
  visible: "visible",
  hiddenWithTransition: "hiddenWithTransition",
  hiddenWithoutTransition: "hiddenWithoutTransition",
};

export const OVERLAY_VARIANTS: Variants = {
  [OVERLAY_VARIANT_LABELS.visible]: {
    opacity: 1,
    transition: SIDEBAR_TRANSITION,
  },
  [OVERLAY_VARIANT_LABELS.hiddenWithTransition]: {
    opacity: 0,
    transition: SIDEBAR_TRANSITION,
  },
  [OVERLAY_VARIANT_LABELS.hiddenWithoutTransition]: {
    opacity: 0,
    transition: {
      type: false,
    },
  },
};

export const PLACEHOLDER_VARIANT_LABELS = {
  visibleWithTransition: "visibleWithTransition",
  visibleWithoutTransition: "visibleWithoutTransition",
  hidden: "hidden",
};

export const PLACEHOLDER_VARIANTS: Variants = {
  [PLACEHOLDER_VARIANT_LABELS.visibleWithTransition]: {
    marginLeft: 0,
    transition: SIDEBAR_TRANSITION,
  },
  [PLACEHOLDER_VARIANT_LABELS.visibleWithoutTransition]: {
    marginLeft: 0,
    transition: {
      type: false,
    },
  },
  [PLACEHOLDER_VARIANT_LABELS.hidden]: (sidebarWidth: number) => ({
    marginLeft: -sidebarWidth,
    transition: SIDEBAR_TRANSITION,
  }),
};
