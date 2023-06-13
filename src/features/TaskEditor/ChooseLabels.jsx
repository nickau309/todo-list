import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { autoUpdate, flip, shift, useFloating } from "@floating-ui/react-dom";
import { Combobox } from "@headlessui/react";
import { LabelIconOutline16, LabelIconSolid12 } from "@assets";
import { LabelsDropdown } from "@components/dropdowns";
import { InputButton, RemoveButton } from "./components";

export default function ChooseLabels({ editId, editType }) {
  const { tasks } = useLoaderData();

  const [labels, setLabels] = useState(() =>
    editId && editType === "editTask"
      ? tasks.find((t) => t.id === editId).labelIds
      : []
  );

  const { refs, floatingStyles } = useFloating({
    middleware: [
      flip({
        fallbackStrategy: "initialPlacement",
      }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Combobox value={labels} onChange={setLabels} name="labelIds" multiple>
      {({ value, open }) => (
        <>
          <Combobox.Button
            ref={refs.setReference}
            as={InputButton}
            className="group/labels"
          >
            <span className="grid h-4 w-4 place-items-center group-hover/labels:text-quaternary-hover-tint group-focus-visible/labels:text-quaternary-hover-tint">
              {value.length ? <LabelIconSolid12 /> : <LabelIconOutline16 />}
            </span>
            <span className="font-reactist text-[13px]">
              {value.length || "Labels"}
            </span>
            {value.length > 0 && (
              <RemoveButton
                onClick={() => setLabels([])}
                aria-label="Remove all labels"
              />
            )}
          </Combobox.Button>
          {open && (
            <LabelsDropdown ref={refs.setFloating} style={floatingStyles} />
          )}
        </>
      )}
    </Combobox>
  );
}
