"use client";

import { useSettingsDialogControl } from "@/contexts/settings-dialog-context";
import { useEffect } from "react";

export default function OpenSettingsDialog() {
  const { setIsOpen } = useSettingsDialogControl();

  // Open settings dialog after initial render
  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return null;
}
