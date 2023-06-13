import React from "react";
import { Popover } from "@headlessui/react";
import { AddAboveIcon24 } from "@assets";
import { useEditorControl } from "@contexts";
import { Button } from "./components";

export default function AddTaskAbove({ id }) {
  const { openEditor } = useEditorControl();

  return (
    <Popover.Button as={Button} onClick={() => openEditor("addTaskAbove", id)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <AddAboveIcon24 />
        </span>
        <span className="text-sm/6">Add task above</span>
      </div>
    </Popover.Button>
  );
}
