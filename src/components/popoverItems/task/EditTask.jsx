import React from "react";
import { Popover } from "@headlessui/react";
import { EditIcon24 } from "@/assets";
import { useEditorControl } from "@/contexts";
import { Button } from "./components";

export default function EditTask({ id }) {
  const { openEditor } = useEditorControl();

  return (
    <Popover.Button as={Button} onClick={() => openEditor("editTask", id)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <EditIcon24 />
        </span>
        <span className="text-sm/6">Edit task</span>
      </div>
    </Popover.Button>
  );
}
