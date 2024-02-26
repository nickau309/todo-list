import React, { Fragment } from "react";
import { autoUpdate, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { NotificationIcon24 } from "@/assets";
import { ErrorComponent } from "@/components";
import { Z50Portal } from "@/components/portals";
import { useSetShowSidebarSm } from "@/contexts";
import { classNames } from "@/utils";

export default function Notification() {
  const { refs, floatingStyles } = useFloating({
    middleware: [
      shift({
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const setShowSidebarSm = useSetShowSidebarSm();

  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            aria-label="Notifications"
            onClick={() => setShowSidebarSm(false)}
            className={classNames(
              "grid aspect-square w-8 place-items-center rounded-[3px] border border-transparent",
              "focus-visible:bg-navbar-hover-fill",
              "enabled:hover:bg-navbar-hover-fill",
              "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "ui-open:bg-black/10",
            )}
          >
            <NotificationIcon24 />
          </Popover.Button>
          {open && (
            <Z50Portal ref={refs.setFloating} style={floatingStyles}>
              <Popover.Panel
                focus
                static
                className="flex max-h-[88vh] w-[440px] flex-col overflow-hidden rounded-[5px] border border-divider-secondary bg-base-primary text-content-primary"
              >
                <div className="flex min-h-0 justify-center overflow-auto p-4 pb-8">
                  <ErrorComponent errorText="Feature not implemented." />
                </div>
              </Popover.Panel>
            </Z50Portal>
          )}
        </>
      )}
    </Popover>
  );
}
