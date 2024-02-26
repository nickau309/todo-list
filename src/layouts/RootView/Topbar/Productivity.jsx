import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { autoUpdate, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { ProductivityIcon24 } from "@/assets";
import { ErrorComponent } from "@/components";
import { Z50Portal } from "@/components/portals";
import { useSetShowSidebarSm, useWidth } from "@/contexts";
import { classNames } from "@/utils";

export default function Productivity() {
  const { todayCompleteTasksCount } = useLoaderData();

  const setShowSidebarSm = useSetShowSidebarSm();
  const width = useWidth();

  const { refs, floatingStyles } = useFloating({
    middleware: [
      shift({
        padding: width >= 751 ? 53.5 : 40,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            aria-label="Productivity"
            onClick={() => setShowSidebarSm(false)}
            className={classNames(
              "-mx-0.5 flex h-8 items-center justify-center gap-[5px] rounded-[3px] px-0.5",
              "hover:bg-navbar-hover-fill",
              "ui-open:bg-navbar-hover-fill",
              "max-[750px]:w-8 min-[750px]:-mx-1.5 min-[750px]:px-1.5",
            )}
          >
            <span>
              <ProductivityIcon24 />
            </span>
            <span className="text-xs/3 max-[750px]:hidden">
              {todayCompleteTasksCount}/5
            </span>
          </Popover.Button>
          {open && (
            <Z50Portal ref={refs.setFloating} style={floatingStyles}>
              <Popover.Panel
                focus
                static
                className="box-content flex max-h-[calc(88vh-30px)] min-h-[100px] w-[340px] flex-col overflow-hidden rounded-[5px] border border-menu bg-base-primary text-content-primary shadow-dropdown"
              >
                <div className="flex min-h-0 justify-center overflow-auto p-5 pt-2.5">
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
