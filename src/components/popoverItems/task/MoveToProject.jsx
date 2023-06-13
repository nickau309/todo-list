import React from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { MoveIcon24 } from "@assets";
import { ProjectDropdown } from "@components/dropdowns";
import { Button } from "./components";

export default function MoveToProject({ id }) {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData();

  const { refs, floatingStyles } = useFloating({
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { projectId } = tasks.find((t) => t.id === id);

  return (
    <>
      <Combobox
        defaultValue={projectId}
        onChange={(projectId) => {
          fetcher.submit(
            { type: "updateTask", id, projectId },
            { method: "post" }
          );
        }}
      >
        {({ open }) => (
          <>
            <Combobox.Button ref={refs.setReference} as={Button}>
              <div className="flex gap-2.5">
                <span className="text-content-secondary">
                  <MoveIcon24 />
                </span>
                <span className="text-sm/6">Move to project</span>
              </div>
            </Combobox.Button>
            {open && (
              <ProjectDropdown ref={refs.setFloating} style={floatingStyles} />
            )}
          </>
        )}
      </Combobox>
    </>
  );
}
