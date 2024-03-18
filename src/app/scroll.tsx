"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Scroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return <></>;
}
