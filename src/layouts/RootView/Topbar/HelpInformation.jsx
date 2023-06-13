import React from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { HelpLgIcon24 } from "@assets";
import {
  CommandMenu,
  GettingStartedGuide,
  Help,
  Inspiration,
  KeyboardShortcuts,
  Sync,
  Templates,
  WhatsNew,
} from "@components/menuItems/user";
import { Z50Portal } from "@components/portals";
import { classNames } from "@utils";

export default function HelpInformation() {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [offset(4)],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={refs.setReference}
            aria-label="Help & Feedback"
            className={classNames(
              "grid aspect-square w-8 place-items-center rounded-[3px]",
              "hover:bg-navbar-hover-fill",
              "ui-open:bg-navbar-hover-fill"
            )}
          >
            <HelpLgIcon24 />
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
                  <Help />
                  <Inspiration />
                  <Templates />
                  <KeyboardShortcuts />
                  <CommandMenu />
                  <GettingStartedGuide />
                  <WhatsNew />
                  <hr className="-mx-1.5 my-1 border-divider-base" />
                  <Sync />
                </div>
              </Menu.Items>
            </Z50Portal>
          )}
        </>
      )}
    </Menu>
  );
}
