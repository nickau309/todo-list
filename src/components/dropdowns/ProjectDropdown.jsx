import React, { forwardRef, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router-dom";
import { Combobox } from "@headlessui/react";
import {
  CreateIcon24,
  InboxIcon24,
  ProjectIcon24,
  SelectCheckIcon12,
} from "@/assets";
import { textColor } from "@/utils";

const ProjectDropdown = forwardRef(function ProjectDropdown(props, ref) {
  const fetcher = useFetcher();
  const { projects } = useRouteLoaderData("root");

  const [query, setQuery] = useState("");

  let filteredProjects;
  if (fetcher.formData) {
    filteredProjects = [
      {
        id: "placeholder",
        name: fetcher.formData.get("name"),
        color: "Charcoal",
        childOrder: Number.MAX_SAFE_INTEGER,
      },
    ];
  } else if (query === "") {
    filteredProjects = projects.filter((p) => !p.isArchived);
  } else {
    filteredProjects = projects.filter(
      (p) =>
        !p.isArchived && p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return (
    <div ref={ref} className="z-[60]" {...props}>
      <div className="box-content flex w-[300px] flex-col divide-y divide-divider-secondary overflow-hidden rounded-[5px] border border-dropdown bg-dropdown shadow-dropdown">
        <Combobox.Input
          displayValue={() => ""}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !filteredProjects.length) {
              e.preventDefault();
            }
          }}
          maxLength="120"
          placeholder="Type a project"
          className="bg-inherit p-2 text-[13px]/[17.6px] text-base-input placeholder:text-field-placeholder focus-visible:outline-none"
        />
        <Combobox.Options
          static
          hold
          className="box-content max-h-[300px] overflow-auto"
        >
          {filteredProjects.map((project) => (
            <Combobox.Option
              key={project.id}
              value={project.id}
              className="flex cursor-pointer items-center gap-2 px-2 py-1 ui-active:bg-menu-item-secondary-hover"
            >
              {({ selected }) => (
                <>
                  {project.childOrder ? (
                    <span className={textColor[project.color]}>
                      <ProjectIcon24 />
                    </span>
                  ) : (
                    <span className="text-views-inbox">
                      <InboxIcon24 />
                    </span>
                  )}
                  <span className="min-w-0 grow truncate pr-1 font-reactist text-[13px]/[16.8px] text-content-primary">
                    {project.name}
                  </span>
                  {selected && (
                    <span className="text-content-primary">
                      <SelectCheckIcon12 />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
          {!filteredProjects.length && (
            <>
              <li className="px-2 py-[7px] text-sm/[18.4px] text-[#555]">
                Project not found
              </li>
              <li>
                <button
                  onClick={() => {
                    fetcher.submit(
                      { type: "addProject", name: query },
                      { method: "post" },
                    );
                  }}
                  className="flex w-full items-center gap-2 px-2 py-1 text-base-primary"
                >
                  <span>
                    <CreateIcon24 />
                  </span>
                  <span className="min-w-0 break-words text-left text-[13px]/[17.6px] font-semibold">
                    Create &quot;{query}&quot;
                  </span>
                </button>
              </li>
            </>
          )}
        </Combobox.Options>
      </div>
    </div>
  );
});

export default ProjectDropdown;
