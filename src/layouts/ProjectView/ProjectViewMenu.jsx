import React from "react";
import { useParams } from "react-router-dom";
import { autoUpdate, shift, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { MoreActionIcon24 } from "@/assets";
import {
  AddExtension,
  AddSection,
  ArchiveProject,
  DeleteProject,
  DuplicateProject,
  EditProject,
  EmailTasksToThisProject,
  ExportAsATemplate,
  ImportFromTemplate,
  ProjectCalendarFeed,
  SetShowCompleted,
} from "@/components/menuItems/project";
import { Z50Portal } from "@/components/portals";
import { classNames } from "@/utils";

export default function ProjectViewMenu({ childOrder, name }) {
  const { projectId } = useParams();

  const { refs, floatingStyles } = useFloating({
    middleware: [
      shift({
        padding: 0.8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu>
      <Menu.Button
        ref={refs.setReference}
        aria-label="Project options menu"
        className={classNames(
          "flex items-center rounded-[3px] text-content-secondary",
          "hover:bg-base-secondary-hover hover:text-base-primary",
        )}
      >
        <MoreActionIcon24 />
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
            {childOrder !== 0 && (
              <>
                <EditProject id={projectId} />
                <hr className="m-1 border-menu" />
              </>
            )}
            <AddSection />
            <hr className="m-1 border-menu" />
            <ImportFromTemplate />
            <ExportAsATemplate />
            <hr className="m-1 border-menu" />
            {childOrder !== 0 && <DuplicateProject id={projectId} />}
            <EmailTasksToThisProject />
            <ProjectCalendarFeed />
            <hr className="m-1 border-menu" />
            <SetShowCompleted />
            <hr className="m-1 border-menu" />
            <AddExtension />
            {childOrder !== 0 && (
              <>
                <hr className="m-1 border-menu" />
                <ArchiveProject id={projectId} name={name} />
                <DeleteProject id={projectId} name={name} />
              </>
            )}
          </div>
        </Menu.Items>
      </Z50Portal>
    </Menu>
  );
}
