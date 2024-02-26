import React from "react";
import { useFetcher, useParams, useRouteLoaderData } from "react-router-dom";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { AddSmIcon24 } from "@/assets";
import { LabelsDropdown } from "@/components/dropdowns";
import { AddButton } from "../components";
import Label from "./Label";

export default function Labels({ disabled, labelIds }) {
  const fetcher = useFetcher();
  const { taskId } = useParams();
  const { labels } = useRouteLoaderData("root");

  const { refs, floatingStyles } = useFloating({
    middleware: [
      flip({
        fallbackStrategy: "initialPlacement",
      }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const displayLabelIds = fetcher.formData
    ? fetcher.formData.get("labelIds").split(",")
    : labelIds;

  return (
    <div className="flex flex-col gap-1">
      <Combobox
        disabled={disabled}
        value={displayLabelIds}
        onChange={(labelIds) => {
          fetcher.submit(
            { type: "updateTask", id: taskId, labelIds },
            { method: "post" },
          );
        }}
        multiple
      >
        {({ value, open }) => (
          <>
            <Combobox.Button
              ref={refs.setReference}
              as={AddButton}
              className={
                open && "bg-quaternary-hover-fill !text-quaternary-hover-tint"
              }
            >
              <span className="grow select-none truncate text-left font-reactist text-xs font-semibold">
                Labels
              </span>
              <span className="-mr-1.5 ml-0.5">
                <AddSmIcon24 />
              </span>
            </Combobox.Button>
            {open && (
              <LabelsDropdown ref={refs.setFloating} style={floatingStyles} />
            )}
            {value.length > 0 && (
              <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                {labels
                  .filter((label) => value.includes(label.id))
                  .map((label) => (
                    <Label
                      key={label.id}
                      color={label.color}
                      id={label.id}
                      name={label.name}
                      showRemoveButton={!disabled}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  );
}
