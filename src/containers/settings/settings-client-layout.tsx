"use client";

import ConfirmDialog from "@/components/confirm-dialog";
import { useSetLocalSettings } from "@/contexts/local-settings-context";
import {
  useSettingsDialogControl,
  useSettingsDialogState,
} from "@/contexts/settings-dialog-context";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback } from "react";
import NavMenu from "./nav-menu";
import { SettingsDialog, SettingsDialogPanel } from "./settings-dialog";

type LayoutProps = {
  children: ReactNode;
};

export default function SettingsClientLayout({ children }: LayoutProps) {
  const setLocalSettings = useSetLocalSettings();

  const { isOpen, nextHref, optimisticSettings } = useSettingsDialogState();
  const { setInputValues, setIsOpen, setNextHref } = useSettingsDialogControl();

  const router = useRouter();

  const isConfirmDialogOpen = nextHref !== null;

  const onConfirmDialogOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setNextHref(null);
      }
    },
    [setNextHref],
  );

  const handleConfirmDialogSubmit = useCallback(() => {
    if (nextHref !== null) {
      setLocalSettings((localSettings) => ({
        ...localSettings,
        theme: optimisticSettings.theme,
      }));
      setInputValues(optimisticSettings);
      router.push(nextHref);
    }
  }, [nextHref, optimisticSettings, router, setInputValues, setLocalSettings]);

  return (
    <SettingsDialog onOpenChange={setIsOpen} open={isOpen}>
      <SettingsDialogPanel>
        <div className="relative flex min-h-0 min-w-0">
          <NavMenu />
          <div className="flex min-w-0 flex-1">{children}</div>
        </div>
        <ConfirmDialog
          handleSubmit={handleConfirmDialogSubmit}
          onOpenChange={onConfirmDialogOpenChange}
          open={isConfirmDialogOpen}
        />
      </SettingsDialogPanel>
    </SettingsDialog>
  );
}
