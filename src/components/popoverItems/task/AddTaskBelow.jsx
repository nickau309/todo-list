import React from "react";
import { Popover } from "@headlessui/react";
import { AddBelowIcon24 } from "@assets";
import { useEditorControl } from "@contexts";
import { Button } from "./components";

export default function AddTaskBelow({ id }) {
  const { openEditor } = useEditorControl();

  return (
    <Popover.Button as={Button} onClick={() => openEditor("addTaskBelow", id)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <AddBelowIcon24 />
        </span>
        <span className="text-sm/6">Add task below</span>
      </div>
    </Popover.Button>
  );
}
