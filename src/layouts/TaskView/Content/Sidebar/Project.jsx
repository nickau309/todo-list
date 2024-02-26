import React from "react";
import { useFetcher, useParams, useRouteLoaderData } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { DropdownIcon24, InboxIcon16, ProjectIcon16 } from "@/assets";
import { ProjectDropdown } from "@/components/dropdowns";
import { classNames, textColor } from "@/utils";
import { ModifyButton } from "./components";

export default function Project({ disabled, projectId }) {
  const fetcher = useFetcher();
  const { taskId } = useParams();
  const { projects } = useRouteLoaderData("root");

  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  const displayProjectId = fetcher.formData?.get("projectId") ?? projectId;

  return (
    <div className="flex flex-col">
      <div className="pl-px font-reactist text-xs/7 font-semibold">Project</div>
      <Combobox
        disabled={disabled}
        value={displayProjectId}
        onChange={(projectId) => {
          fetcher.submit(
            { type: "updateTask", id: taskId, projectId },
            { method: "post" },
          );
        }}
      >
        {({ value, open }) => {
          const project = projects.find((p) => p.id === value);
          return (
            <>
              <Combobox.Button
                ref={refs.setReference}
                as={ModifyButton}
                className={classNames(
                  "group",
                  open && "bg-quaternary-hover-fill",
                )}
              >
                {project.childOrder ? (
                  <span
                    className={classNames("mr-2", textColor[project.color])}
                  >
                    <ProjectIcon16 />
                  </span>
                ) : (
                  <span className="mr-2 text-views-inbox">
                    <InboxIcon16 />
                  </span>
                )}
                <span className="grow select-none truncate text-left font-reactist text-xs">
                  {project.name}
                </span>
                <span className="-mr-1.5 ml-0.5">
                  <DropdownIcon24
                    className={classNames(
                      open ? "block" : "hidden",
                      "group-enabled:group-hover:block group-enabled:group-focus-visible:block group-enabled:group-active:block",
                    )}
                  />
                </span>
              </Combobox.Button>
              {open && (
                <ProjectDropdown
                  ref={refs.setFloating}
                  style={floatingStyles}
                />
              )}
            </>
          );
        }}
      </Combobox>
    </div>
  );
}
