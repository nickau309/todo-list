import React from "react";
import { useFetcher } from "react-router-dom";
import { useEditorControl, useEditorState } from "@/contexts";
import { TaskEditor } from "@/features";

export default function EditTask({ id }) {
  const fetcher = useFetcher();

  const { editId, editType, isEditorOpen } = useEditorState();
  const { closeEditor } = useEditorControl();

  const isEditing = editId === id && editType === "editTask" && isEditorOpen;

  if (!isEditing) {
    return null;
  }

  return (
    <div className="py-1.5">
      <div className="rounded-[10px] border border-divider-secondary bg-base-primary text-content-primary focus-within:border-divider-primary">
        <TaskEditor
          editId={editId}
          editType={editType}
          onClose={closeEditor}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target.closest("form"));
            formData.append("type", "updateTask");
            formData.append("id", id);
            if (!formData.has("labelIds[0]")) {
              formData.append("labelIds", "");
            }
            fetcher.submit(formData, { method: "post" });
            closeEditor();
          }}
          verb="Save"
        />
      </div>
    </div>
  );
}
