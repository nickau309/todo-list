import React from "react";
import { autoUpdate, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { HelpSmIcon24, ViewIcon24 } from "@/assets";
import { Z50Portal } from "@/components/portals";
import { useDialogControl } from "@/contexts";
import GroupListbox from "./GroupListbox";
import LayoutListbox from "./LayoutListbox";
import SortListbox from "./SortListbox";

export default function ProjectViewOptions({ viewStyle }) {
  const { refs, floatingStyles } = useFloating({
    middleware: [
      shift({
        padding: 20,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { openDialog } = useDialogControl();

  return (
    <Popover>
      <Popover.Button
        ref={refs.setReference}
        aria-label="View options menu"
        className="flex items-center rounded-[3px] text-content-secondary hover:bg-base-secondary-hover hover:text-base-primary"
      >
        <ViewIcon24 />
        <span className="ml-[3px] mr-1.5 text-xs max-[1055px]:hidden">
          View
        </span>
      </Popover.Button>
      <Z50Portal ref={refs.setFloating} style={floatingStyles}>
        <Popover.Panel className="box-content w-[300px] overflow-hidden rounded-[10px] border border-menu bg-menu py-1 text-menu shadow-menu">
          <div>
            <header className="flex items-center justify-between px-3 py-1">
              <h4 className="text-[13px]/6 font-bold text-default">View</h4>
              <button
                onClick={() => openDialog("Help")}
                className="text-content-secondary hover:text-content-primary"
              >
                <HelpSmIcon24 />
              </button>
            </header>
            <LayoutListbox viewStyle={viewStyle} />
          </div>
          <hr className="my-1 border-menu" />
          <header className="flex items-center justify-between px-3 py-1">
            <h4 className="text-[13px]/6 font-bold text-default">Sort</h4>
            <button
              onClick={() => openDialog("Help")}
              className="text-content-secondary hover:text-content-primary"
            >
              <HelpSmIcon24 />
            </button>
          </header>
          <GroupListbox />
          <SortListbox />
        </Popover.Panel>
      </Z50Portal>
    </Popover>
  );
}
