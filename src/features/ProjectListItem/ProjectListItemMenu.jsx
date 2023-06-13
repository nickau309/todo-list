import React from "react";
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { MoreActionIcon24 } from "@assets";
import { QuaternaryButton } from "@components/buttons";
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
  UnarchiveProject,
} from "@components/menuItems/project";
import { Z50Portal } from "@components/portals";
import { classNames } from "@utils";

export default function ProjectListItemMenu({ id, isArchived, name }) {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [
      offset(4),
      flip(),
      size({
        apply({ availableHeight, elements }) {
          elements.floating.style.setProperty(
            "--max-height",
            availableHeight + "px"
          );
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu>
      <Menu.Button
        ref={refs.setReference}
        as={QuaternaryButton}
        aria-label="More project actions"
        className={classNames(
          "w-8 transition-colors duration-300",
          "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 ui-open:opacity-100",
          "ui-open:!bg-quaternary-hover-fill ui-open:!text-quaternary-hover-tint"
        )}
      >
        <MoreActionIcon24 />
      </Menu.Button>
      <Z50Portal ref={refs.setFloating} style={floatingStyles}>
        <Menu.Items
          unmount={false}
          className={classNames(
            "box-content flex max-h-[var(--max-height)] w-[250px] overflow-hidden rounded-[10px] border border-menu bg-menu text-menu shadow-menu",
            "focus-visible:outline-none"
          )}
        >
          <div className="flex grow flex-col overflow-y-auto overflow-x-hidden py-1">
            {isArchived ? (
              <UnarchiveProject id={id} />
            ) : (
              <>
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
              </>
            )}
            <DeleteProject id={id} name={name} />
          </div>
        </Menu.Items>
      </Z50Portal>
    </Menu>
  );
}
