import React, { useEffect, useRef, useState } from "react";
import { useFetcher, useParams, useRouteLoaderData } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { AddSmIcon24, LabelIconOutline24 } from "@assets";
import { LabelsDropdown } from "@components/dropdowns";
import { classNames } from "@utils";
import Label from "./Label";
import LabelsButton from "./LabelsButton";

export default function Labels({ disabled, labelIds }) {
  const fetcher = useFetcher();
  const { taskId } = useParams();
  const { labels } = useRouteLoaderData("root");

  const labelsContainerRef = useRef();
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  const displayLabelIds = fetcher.formData
    ? fetcher.formData.get("labelIds").split(",")
    : labelIds;

  useEffect(() => {
    if (labelsContainerRef.current) {
      setIsButtonShown(labelsContainerRef.current.scrollHeight > 64);
    }
  }, [displayLabelIds]);

  const LabelsDropdownComponent = (
    <LabelsDropdown ref={refs.setFloating} style={floatingStyles} />
  );

  if (displayLabelIds.length) {
    return (
      <div className="flex gap-3 py-2 pl-[18px] pr-[30px]">
        <span className="text-ellipsis">
          <LabelIconOutline24 />
        </span>
        <div className="flex min-w-0 grow flex-col items-start gap-0.5">
          <Combobox
            disabled={disabled}
            value={displayLabelIds}
            onChange={(labelIds) => {
              fetcher.submit(
                { type: "updateTask", id: taskId, labelIds },
                { method: "post" }
              );
            }}
            multiple
          >
            {({ value, open }) => (
              <>
                <div
                  ref={labelsContainerRef}
                  className={classNames(
                    !showAll && "max-h-16",
                    "w-full overflow-hidden"
                  )}
                >
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
                {isButtonShown && (
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className={classNames(
                      "flex h-8 max-w-full items-center rounded-[5px] border border-transparent px-3 transition-colors duration-300",
                      "text-tertiary-tint hover:bg-tertiary-hover-fill hover:text-tertiary-hover-tint",
                      "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]"
                    )}
                  >
                    <span className="grow select-none truncate text-left font-reactist text-[13px]/8">
                      {showAll ? "Show less" : "Show more"}
                    </span>
                  </button>
                )}
                <Combobox.Button
                  ref={refs.setReference}
                  as={LabelsButton}
                  labelIdsLength={value.length}
                  className={
                    open &&
                    "bg-quaternary-hover-fill !text-quaternary-hover-tint"
                  }
                >
                  <span className="-ml-[3px] mr-0.5">
                    <AddSmIcon24 />
                  </span>
                  <span className="grow select-none truncate text-left font-reactist text-xs/7 font-semibold">
                    Add
                  </span>
                </Combobox.Button>
                {open && LabelsDropdownComponent}
              </>
            )}
          </Combobox>
        </div>
      </div>
    );
  } else {
    return (
      <Combobox
        disabled={disabled}
        value={displayLabelIds}
        onChange={(labelIds) => {
          fetcher.submit(
            { type: "updateTask", id: taskId, labelIds },
            { method: "post" }
          );
        }}
        multiple
      >
        {({ value, open }) => (
          <>
            <Combobox.Button
              ref={refs.setReference}
              as={LabelsButton}
              labelIdsLength={value.length}
              className={
                open && "bg-quaternary-hover-fill !text-quaternary-hover-tint"
              }
            >
              <span className="mr-3.5">
                <LabelIconOutline24 />
              </span>
              <span className="grow select-none truncate text-left font-reactist leading-8">
                Add labels
              </span>
            </Combobox.Button>
            {open && LabelsDropdownComponent}
          </>
        )}
      </Combobox>
    );
  }
}
