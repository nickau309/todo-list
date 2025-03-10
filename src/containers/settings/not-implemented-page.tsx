"use client";

import ErrorComponent from "@/components/error-component";
import Text from "@/components/ui/text";
import UpgradeIcon from "@/components/upgrade-icon";
import { NAV_MENU_ITEMS } from "@/constants/settings";
import CloseSettingsDialogButton from "./components/close-settings-dialog-button";
import OpenNavMenuButton from "./components/open-nav-menu-button";

type PageProps = {
  segment: string;
};

export default function NotImplementedPage({ segment }: PageProps) {
  const currentItem =
    NAV_MENU_ITEMS.find((item) => item.segment === segment) ??
    NAV_MENU_ITEMS[0];

  return (
    <div className="flex h-full w-full flex-col divide-y divide-divider-secondary">
      <header className="flex items-center justify-between gap-4 p-2 pl-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <OpenNavMenuButton />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <Text
              as="h2"
              overflow="truncate"
              font="reactist"
              size="16px"
              weight={600}
              height="23px"
              color="primary"
            >
              {currentItem.description}
            </Text>
            {currentItem.showUpgradeIcon && <UpgradeIcon />}
          </div>
        </div>
        <CloseSettingsDialogButton />
      </header>
      <div className="grid flex-1 place-items-center overflow-y-auto overflow-x-hidden p-4">
        <ErrorComponent text="Feature not implemented." />
      </div>
    </div>
  );
}
