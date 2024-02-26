import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Listbox } from "@headlessui/react";
import { Priority4Icon16, PriorityIcon16 } from "@/assets";
import { PriorityDropdown } from "@/components/dropdowns";
import { priorityTextColor as textColor } from "@/utils";
import { InputButton, RemoveButton } from "./components";

export default function ChoosePriority({ editId, editType }) {
  const { tasks } = useLoaderData();

  const [priority, setPriority] = useState(() =>
    editId && editType === "editTask"
      ? tasks.find((t) => t.id === editId).priority
      : 4,
  );

  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Listbox value={priority} onChange={setPriority} name="priority">
      {({ value, open }) => (
        <>
          <Listbox.Button ref={refs.setReference} as={InputButton}>
            <span className={textColor[value]}>
              {value === 4 ? <Priority4Icon16 /> : <PriorityIcon16 />}
            </span>
            <span className="font-reactist text-[13px]">
              {value === 4 ? "Priority" : "P" + value}
            </span>
            {value !== 4 && (
              <RemoveButton
                onClick={() => setPriority(4)}
                aria-label="Remove priority"
              />
            )}
          </Listbox.Button>
          {open && (
            <PriorityDropdown ref={refs.setFloating} style={floatingStyles} />
          )}
        </>
      )}
    </Listbox>
  );
}
