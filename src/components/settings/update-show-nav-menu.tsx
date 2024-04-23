"use client";

import { useSetShowNavMenu } from "@/contexts/settings/show-nav-menu-context";
import { useWidth } from "@/contexts/width-context";
import { useEffect } from "react";

export default function UpdateShowNavMenu() {
  const setShowNavMenu = useSetShowNavMenu();

  const width = useWidth();

  // Update `showNavMenu` under some conditions
  useEffect(() => {
    if (width > 660) {
      setShowNavMenu(false);
    }
  }, [setShowNavMenu, width]);

  return null;
}
