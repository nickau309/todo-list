import React from "react";
import { useFetcher, useParams, useRouteLoaderData } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { InboxIcon24, ProjectIcon24 } from "@assets";
import { ProjectDropdown } from "@components/dropdowns";
import { classNames, textColor } from "@utils";
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
    <Combobox
      disabled={disabled}
      value={displayProjectId}
      onChange={(projectId) => {
        fetcher.submit(
          { type: "updateTask", id: taskId, projectId },
          { method: "post" }
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
                open && "bg-quaternary-hover-fill !text-quaternary-hover-tint"
              )}
            >
              {project.childOrder ? (
                <span
                  className={classNames("mr-3.5", textColor[project.color])}
                >
                  <ProjectIcon24 />
                </span>
              ) : (
                <span className="mr-3.5 text-views-inbox">
                  <InboxIcon24 />
                </span>
              )}
              <span className="grow select-none truncate text-left font-reactist leading-8">
                {project.name}
              </span>
            </Combobox.Button>
            {open && (
              <ProjectDropdown ref={refs.setFloating} style={floatingStyles} />
            )}
          </>
        );
      }}
    </Combobox>
  );
}
