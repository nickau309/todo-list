import React from "react";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";

const variants = {
  open: {
    height: "auto",
    overflow: "hidden",
    transitionEnd: { overflow: "unset" },
  },
  close: {
    height: 0,
    overflow: "hidden",
  },
};

export default function AnimatedDisclosurePanel({ children, ...attr }) {
  return (
    <Disclosure.Panel
      as={motion.div}
      static
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      variants={variants}
      {...attr}
    >
      {children}
    </Disclosure.Panel>
  );
}
