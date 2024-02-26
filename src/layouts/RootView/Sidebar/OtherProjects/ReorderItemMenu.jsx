import React from "react";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { MoreActionIcon16 } from "@/assets";
import {
  AddProjectAbove,
  AddProjectBelow,
  ArchiveProject,
  DeleteProject,
  DuplicateProject,
  EditProject,
  EmailTasksToThisProject,
  ProjectCalendarFeed,
  SetIsFavorite,
  ShareProject,
} from "@/components/menuItems/project";
import { Z50Portal } from "@/components/portals";
import { classNames } from "@/utils";

export default function ReorderItemMenu({ id, onClick, open, name }) {
  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <Menu.Button
        ref={refs.setReference}
        onClick={onClick}
        aria-label="More project actions"
        className={classNames(
          "absolute grid h-6 w-6 place-items-center rounded-[3px]",
          open
            ? "text-base-primary"
            : "text-content-secondary opacity-0 hover:text-base-primary",
          "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:!transition-shadow focus-visible:!duration-300 focus-visible:!ease-[cubic-bezier(.25,.1,.25,1)]",
          "group-focus-within/item:opacity-100 group-focus-within/item:transition-opacity group-focus-within/item:duration-300 group-focus-within/item:ease-[cubic-bezier(.25,.1,.25,1)]",
          "group-hover/item:opacity-100 group-hover/item:transition-opacity group-hover/item:duration-300 group-hover/item:ease-[cubic-bezier(.25,.1,.25,1)]",
        )}
      >
        <MoreActionIcon16 />
      </Menu.Button>
      <Z50Portal ref={refs.setFloating} style={floatingStyles}>
        <Menu.Items
          unmount={false}
          className={classNames(
            "box-content flex w-[250px] overflow-hidden rounded-[10px] border border-menu bg-menu text-menu shadow-menu",
            "focus-visible:outline-none",
          )}
        >
          <div className="flex grow flex-col overflow-y-auto overflow-x-hidden py-1">
            <AddProjectAbove id={id} />
            <AddProjectBelow id={id} />
            <hr className="m-1 border-menu" />
            <EditProject id={id} />
            <ShareProject id={id} />
            <SetIsFavorite id={id} />
            <hr className="m-1 border-menu" />
            <DuplicateProject id={id} />
            <EmailTasksToThisProject />
            <ProjectCalendarFeed />
            <hr className="m-1 border-menu" />
            <ArchiveProject id={id} name={name} />
            <DeleteProject id={id} name={name} />
          </div>
        </Menu.Items>
      </Z50Portal>
    </>
  );
}
