import React from "react";
import { AddIcon13 } from "@assets";
import { useEditorControl, useEditorState } from "@contexts";
import { classNames } from "@utils";

export default function AddTaskButton({ isInTaskPanel }) {
  const { openEditor } = useEditorControl();
  const { editType, isEditorOpen } = useEditorState();

  const isAdding = editType?.startsWith("addTask") && isEditorOpen;

  if (isAdding) {
    return null;
  }

  return (
    <div className="">
      <button
        type="button"
        onClick={() => openEditor("addTask")}
        className={classNames(
          "group flex h-[33.2px] w-full items-center gap-[11px] rounded-[5px] text-left",
          !isInTaskPanel && "pl-px",
          "focus-visible:-ml-2.5 focus-visible:w-[calc(100%+10px)] focus-visible:bg-task-button focus-visible:pl-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-task-button"
        )}
      >
        <span className="grid aspect-square w-[17px] place-items-center rounded-full text-add-task-icon group-hover:bg-add-task-icon group-hover:text-white">
          <AddIcon13 className="group-hover:scale-[.846]" />
        </span>
        <span className="text-sm text-charcoal group-hover:text-add-task-text">
          {isInTaskPanel ? "Add sub-task" : "Add task"}
        </span>
      </button>
    </div>
  );
}
