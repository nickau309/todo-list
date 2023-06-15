import React, { Fragment } from "react";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { MoreActionIcon16 } from "@assets";
import {
  AddExtension,
  AddTaskAbove,
  AddTaskBelow,
  CopyLinkToTask,
  DeleteTask,
  Duplicate,
  EditTask,
  MoveToProject,
  Reminders,
  SetDueDate,
  SetPriority,
} from "@components/popoverItems/task";
import { Z50Portal } from "@components/portals";
import { classNames } from "@utils";

export default function ItemMenu({ id, isArchived, isCompleted, name }) {
  const { refs, floatingStyles } = useFloating({
    middleware: [
      flip({
        crossAxis: false,
        fallbackAxisSideDirection: "start",
      }),
      shift({ padding: 20 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Popover as={Fragment}>
      <Popover.Button
        ref={refs.setReference}
        aria-label="More task actions"
        className={({ open }) => {
          return classNames(
            "grid aspect-square w-6 place-items-center rounded-[3px] text-content-secondary",
            "hover:bg-base-secondary-hover hover:text-base-primary",
            "focus-visible:bg-base-secondary-hover focus-visible:text-base-primary",
            !open &&
              "opacity-0 group-focus-within/action:opacity-100 group-hover:opacity-100"
          );
        }}
      >
        <MoreActionIcon16 />
      </Popover.Button>
      <Z50Portal ref={refs.setFloating} style={floatingStyles}>
        <Popover.Panel
          focus
          unmount={false}
          className="box-content flex w-[250px] overflow-hidden rounded-[10px] border border-menu bg-menu text-menu shadow-menu"
        >
          {({ close }) => (
            <div className="flex grow flex-col overflow-y-auto overflow-x-hidden py-1">
              {!isArchived && !isCompleted && (
                <>
                  <AddTaskAbove id={id} />
                  <AddTaskBelow id={id} />
                  <EditTask id={id} />
                  <hr className="m-1 border-menu" />
                  <SetDueDate close={close} id={id} />
                  <SetPriority id={id} />
                  <hr className="m-1 border-menu" />
                  <Reminders />
                  <hr className="m-1 border-menu" />
                  <MoveToProject id={id} />
                  <Duplicate id={id} />
                </>
              )}
              <CopyLinkToTask id={id} />
              {!isArchived && !isCompleted && (
                <>
                  <hr className="m-1 border-menu" />
                  <AddExtension />
                </>
              )}
              {!isArchived && (
                <>
                  <hr className="m-1 border-menu" />
                  <DeleteTask id={id} name={name} />
                </>
              )}
            </div>
          )}
        </Popover.Panel>
      </Z50Portal>
    </Popover>
  );
}
