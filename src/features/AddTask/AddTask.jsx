import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useEditorControl, useEditorState } from "@/contexts";
import { TaskEditor } from "@/features";

export default function AddTask() {
  const fetcher = useFetcher();

  const [seed, setSeed] = useState();
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setSeed(Math.random());
    }
  }, [fetcher.state]);

  const { editType, isEditorOpen } = useEditorState();
  const { closeEditor } = useEditorControl();

  const isAdding = editType === "addTask" && isEditorOpen;

  if (!isAdding) {
    return null;
  }

  return (
    <div className="py-1.5">
      <div className="rounded-[10px] border border-divider-secondary bg-base-primary text-content-primary focus-within:border-divider-primary">
        <TaskEditor
          key={seed}
          editType={editType}
          onClose={closeEditor}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target.closest("form"));
            formData.append("type", "addTask");
            fetcher.submit(formData, { method: "post" });
          }}
          verb="Add task"
        />
      </div>
    </div>
  );
}
