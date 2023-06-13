import React from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import {
  ActivityLog,
  DownloadApps,
  Integrations,
  LogOut,
  Print,
  Settings,
  Theme,
  UpgradeToBusiness,
  UpgradeToPro,
} from "@components/menuItems/user";
import { Z50Portal } from "@components/portals";
import { classNames } from "@utils";

export default function TopbarMenu() {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [
      offset({
        mainAxis: 4,
        crossAxis: -0.8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={refs.setReference}
            aria-label="Settings"
            className="grid aspect-square w-8 place-items-center rounded-[3px]"
          >
            <div
              className={classNames(
                "rounded-full border-2 border-transparent",
                "ui-open:border-divider-on-dark"
              )}
            >
              <span className="grid aspect-square w-7 place-items-center rounded-full border-2 bg-default text-base/6 text-username">
                u
              </span>
            </div>
          </Menu.Button>
          {open && (
            <Z50Portal ref={refs.setFloating} style={floatingStyles}>
              <Menu.Items
                static
                className={classNames(
                  "box-content flex max-h-[80vh] min-w-[276px] max-w-[350px] overflow-hidden rounded-[10px] border border-menu-topbar bg-menu font-reactist text-base-primary shadow-menu-topbar",
                  "focus-visible:outline-none"
                )}
              >
                <div className="flex grow flex-col overflow-y-auto overflow-x-hidden p-1.5">
                  <Settings />
                  <hr className="-mx-1.5 my-1 border-divider-base" />
                  <Theme />
                  <ActivityLog />
                  <Print />
                  <Integrations />
                  <hr className="-mx-1.5 my-1 border-divider-base" />
                  <UpgradeToPro />
                  <UpgradeToBusiness />
                  <DownloadApps />
                  <hr className="-mx-1.5 my-1 border-divider-base" />
                  <LogOut />
                </div>
              </Menu.Items>
            </Z50Portal>
          )}
        </>
      )}
    </Menu>
  );
}
