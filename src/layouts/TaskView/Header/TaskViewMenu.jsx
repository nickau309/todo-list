import React, { Fragment } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { MoreActionIcon24 } from "@/assets";
import { QuaternaryButton } from "@/components/buttons";
import {
  AddCommentsViaEmail,
  AddExtension,
  CopyLinkToTask,
  DeleteTask,
  DuplicateTask,
  PrintTask,
  ViewTaskActivity,
} from "@/components/menuItems/task";
import { Z50Portal } from "@/components/portals";
import { classNames } from "@/utils";

export default function TaskViewMenu({ addedAt, name, projectId }) {
  const { taskId } = useParams();
  const { projects } = useRouteLoaderData("root");

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [offset(4)],
    whileElementsMounted: autoUpdate,
  });

  const addedAtDate = new Date(addedAt);
  const now = new Date();

  const addedAtDateString = addedAtDate.toLocaleDateString(
    "en-HK",
    addedAtDate.getFullYear() === now.getFullYear()
      ? { day: "numeric", month: "short" }
      : { day: "numeric", month: "short", year: "numeric" },
  );

  const addedAtTimeString = addedAtDate.toLocaleTimeString("en-HK", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const { isArchived } = projects.find((p) => p.id === projectId);

  return (
    <Menu as={Fragment}>
      <Menu.Button
        ref={refs.setReference}
        as={QuaternaryButton}
        aria-label="More actions"
        className={({ open }) => {
          return classNames(
            "w-8 transition-colors duration-300",
            open && "bg-quaternary-hover-fill !text-quaternary-hover-tint",
          );
        }}
      >
        <MoreActionIcon24 />
      </Menu.Button>
      <Z50Portal ref={refs.setFloating} style={floatingStyles}>
        <Menu.Items
          unmount={false}
          className={classNames(
            "box-content flex min-w-[280px] max-w-[300px] overflow-hidden rounded-[10px] border border-divider-secondary bg-menu font-reactist text-content-primary shadow-[0_0_8px_rgba(0,0,0,.12)]",
            "focus-visible:outline-none",
          )}
        >
          <div className="flex grow flex-col overflow-y-auto overflow-x-hidden p-1.5">
            <div className="px-1.5 py-2 text-[13px]/[16.8px] text-content-secondary">
              Added on {addedAtDateString} · {addedAtTimeString}
            </div>
            <hr className="-mx-1.5 my-1 border-divider-base" />
            <CopyLinkToTask id={taskId} projectId={projectId} />
            {!isArchived && (
              <>
                <DuplicateTask id={taskId} />
                <AddCommentsViaEmail />
                <ViewTaskActivity />
              </>
            )}
            <PrintTask />
            {!isArchived && (
              <>
                <hr className="-mx-1.5 my-1 border-divider-base" />
                <AddExtension />
                <hr className="-mx-1.5 my-1 border-divider-base" />
                <DeleteTask id={taskId} name={name} />
              </>
            )}
          </div>
        </Menu.Items>
      </Z50Portal>
    </Menu>
  );
}
