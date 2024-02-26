import React from "react";
import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { MoreActionIcon16 } from "@/assets";
import { AddExtension, EditTaskActions } from "@/components/menuItems/task";
import { Z50Portal } from "@/components/portals";
import { classNames } from "@/utils";
import { InputButton } from "./components";

export default function MoreAction() {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={refs.setReference}
            as={InputButton}
            className="group/actions"
          >
            <span className="group-hover/actions:text-quaternary-hover-tint group-focus-visible/actions:text-quaternary-hover-tint">
              <MoreActionIcon16 />
            </span>
          </Menu.Button>
          {open && (
            <Z50Portal ref={refs.setFloating} style={floatingStyles}>
              <Menu.Items
                static
                className={classNames(
                  "box-content flex w-[248px] overflow-hidden rounded-[10px] border border-divider-secondary bg-menu font-reactist text-content-primary shadow-[0_0_8px_rgba(0,0,0,.12)]",
                  "focus-visible:outline-none",
                )}
              >
                <div className="flex grow flex-col overflow-y-auto overflow-x-hidden p-1.5">
                  <hr className="-mx-1.5 my-1 border-divider-base" />
                  <AddExtension />
                  <hr className="-mx-1.5 my-1 border-divider-base" />
                  <EditTaskActions />
                </div>
              </Menu.Items>
            </Z50Portal>
          )}
        </>
      )}
    </Menu>
  );
}
