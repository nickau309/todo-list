import React from "react";
import { useFetcher } from "react-router-dom";
import { useEditorControl, useEditorState } from "@/contexts";
import { TaskEditor } from "@/features";

export default function AddTaskAbove({ id, ...attr }) {
  const fetcher = useFetcher();

  const { editId, editType, isEditorOpen } = useEditorState();
  const { closeEditor } = useEditorControl();

  const isAdding = editId === id && editType === "addTaskAbove" && isEditorOpen;

  if (!isAdding) {
    return null;
  }

  return (
    <li {...attr}>
      <div className="py-1.5">
        <div className="rounded-[10px] border border-divider-secondary bg-base-primary text-content-primary focus-within:border-divider-primary">
          <TaskEditor
            editId={editId}
            editType={editType}
            onClose={closeEditor}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target.closest("form"));
              formData.append("type", "addTask");
              formData.append("nextId", id);
              fetcher.submit(formData, { method: "post" });
              closeEditor();
            }}
            verb="Add task"
          />
        </div>
      </div>
    </li>
  );
}
