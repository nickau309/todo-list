import React, { forwardRef, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router-dom";
import { Combobox } from "@headlessui/react";
import {
  CreateIcon24,
  LabelIconSolid24,
  OptionCheckIcon24,
  OptionUncheckIcon24,
} from "@/assets";
import { Z60Portal } from "@/components/portals";
import { textColor } from "@/utils";

const LabelsDropdown = forwardRef(function LabelsDropdown(props, ref) {
  const fetcher = useFetcher();
  const { labels } = useRouteLoaderData("root");

  const [query, setQuery] = useState("");

  let filteredLabels;
  if (query === "") {
    filteredLabels = labels;
  } else if (fetcher.formData) {
    filteredLabels = [
      {
        id: "placeholder",
        name: fetcher.formData.get("name"),
        color: "Charcoal",
      },
    ];
  } else {
    filteredLabels = labels.filter((project) => {
      return project.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  return (
    <Z60Portal ref={ref} {...props}>
      <div className="box-content flex flex-col divide-y divide-divider-secondary overflow-hidden rounded-[5px] border border-dropdown bg-dropdown shadow-dropdown">
        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !filteredLabels.length) {
              e.preventDefault();
            }
          }}
          maxLength="60"
          placeholder="Type a label"
          className="bg-inherit p-2 text-[13px]/[17.6px] text-base-input placeholder:text-field-placeholder focus-visible:outline-none"
        />
        <Combobox.Options
          static
          hold
          className="box-content max-h-[300px] overflow-auto"
        >
          {filteredLabels.map((label) => (
            <Combobox.Option
              key={label.id}
              value={label.id}
              className="flex cursor-pointer items-center gap-2.5 px-2 py-1 ui-active:bg-menu-item-secondary-hover"
            >
              {({ selected }) => (
                <>
                  <span className={textColor[label.color]}>
                    <LabelIconSolid24 />
                  </span>
                  <span className="min-w-0 grow truncate text-[13px]/[16.8px] text-content-primary">
                    {label.name}
                  </span>
                  <span className="text-content-secondary">
                    {selected ? <OptionCheckIcon24 /> : <OptionUncheckIcon24 />}
                  </span>
                </>
              )}
            </Combobox.Option>
          ))}
          {query.length > 0 && !filteredLabels.length && (
            <>
              <li className="px-2.5 py-[7px] text-[13px]/[17.6px] text-[#555]">
                Label not found
              </li>
              <li>
                <button
                  onClick={() => {
                    fetcher.submit(
                      { type: "addLabel", name: query },
                      { method: "post" },
                    );
                  }}
                  className="flex w-full items-center gap-2.5 px-2.5 py-1 text-base-primary"
                >
                  <span>
                    <CreateIcon24 />
                  </span>
                  <span className="text-[13px] font-semibold">
                    Create &quot;{query}&quot;
                  </span>
                </button>
              </li>
            </>
          )}
        </Combobox.Options>
      </div>
    </Z60Portal>
  );
});

export default LabelsDropdown;
