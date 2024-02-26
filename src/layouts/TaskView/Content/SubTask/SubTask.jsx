import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AddSmIcon24 } from "@/assets";
import { useEditorControl, useEditorState, useWidth } from "@/contexts";
import { AddTask } from "@/features";
import { classNames } from "@/utils";
import TaskListDisclosure from "./TaskListDisclosure";

export default function SubTask({ isArchived }) {
  const { tasks } = useLoaderData();
  const { taskId } = useParams();

  const { openEditor } = useEditorControl();
  const { editType, isEditorOpen } = useEditorState();
  const width = useWidth();

  const { childIds } = tasks.find((t) => t.id === taskId);

  const isAddingTask = editType?.startsWith("addTask") && isEditorOpen;

  if (childIds.length) {
    return <TaskListDisclosure childIds={childIds} isArchived={isArchived} />;
  }

  if (width >= 751 && isAddingTask) {
    return (
      <div className="ml-9 border-b border-divider-secondary pb-2.5 pt-1.5">
        <AddTask />
      </div>
    );
  } else if (isArchived) {
    return null;
  } else if (width >= 751) {
    return (
      <div className="ml-9 border-b border-divider-secondary pb-4 pt-3">
        <button
          type="button"
          onClick={() => openEditor("addTask")}
          className={classNames(
            "-mx-2 flex h-7 min-w-[68px] items-center rounded-[5px] border border-transparent pl-0.5 pr-2 text-quaternary-tint transition-colors duration-300",
            "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
            "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
            "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
          )}
        >
          <span className="mr-0.5">
            <AddSmIcon24 />
          </span>
          <span className="grow select-none truncate text-left font-reactist text-xs/7 font-semibold">
            Add sub-task
          </span>
        </button>
      </div>
    );
  } else if (isAddingTask) {
    return (
      <div className="flex flex-col px-2 py-[5px]">
        <AddTask />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col py-[3px]">
        <button
          type="button"
          onClick={() => openEditor("addTask")}
          className={classNames(
            "mx-3 flex h-10 min-w-[68px] items-center rounded-[5px] pl-1.5 pr-3 text-content-secondary transition-colors duration-300",
            "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
            "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
          )}
        >
          <span className="mr-3.5">
            <AddSmIcon24 />
          </span>
          <span className="grow select-none truncate text-left font-reactist leading-8">
            Add sub-task
          </span>
        </button>
      </div>
    );
  }
}
