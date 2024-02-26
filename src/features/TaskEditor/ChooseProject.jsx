import React from "react";
import { useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { DropdownIcon16, InboxIcon16, ProjectIcon16 } from "@/assets";
import { QuaternaryButton } from "@/components/buttons";
import { ProjectDropdown } from "@/components/dropdowns";
import { classNames, textColor } from "@/utils";

export default function ChooseProject({ editId, editType }) {
  const { tasks } = useLoaderData();
  const { projectId } = useParams();
  const { projects } = useRouteLoaderData("root");

  const { refs, floatingStyles } = useFloating({
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const defaultProjectId =
    editId && editType === "editTask"
      ? tasks.find((t) => t.id === editId).projectId
      : projectId ?? projects[0].id;

  return (
    <Combobox defaultValue={defaultProjectId} name="projectId">
      {({ value, open }) => {
        const project = projects.find((p) => p.id === value);
        return (
          <div className="flex min-w-0 overflow-hidden">
            <Combobox.Button
              ref={refs.setReference}
              as={QuaternaryButton}
              className={classNames(
                "min-w-[68px] gap-1 pl-1 pr-2 transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
                open && "bg-quaternary-hover-fill !text-quaternary-hover-tint",
              )}
            >
              {project.childOrder ? (
                <span className={textColor[project.color]}>
                  <ProjectIcon16 />
                </span>
              ) : (
                <span className="text-views-inbox">
                  <InboxIcon16 />
                </span>
              )}
              <span className="truncate font-reactist text-[13px]/8 font-semibold">
                {project.name}
              </span>
              <span>
                <DropdownIcon16 />
              </span>
            </Combobox.Button>
            {open && (
              <ProjectDropdown ref={refs.setFloating} style={floatingStyles} />
            )}
          </div>
        );
      }}
    </Combobox>
  );
}
