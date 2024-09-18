"use client";

import type { TaskInfoKeyType } from "@/types/task";
import { useState } from "react";
import { useTaskState } from "../contexts/task-context";
import DisplayArea from "./display-area";
import EditingArea from "./editing-area";
import EditorFooter from "./editor-footer";
import TaskInfoForm from "./task-info-form";

export default function Info() {
  const { isEditingInfo } = useTaskState();

  const [focusingField, setFocusingField] = useState<TaskInfoKeyType | null>(
    null,
  );

  if (isEditingInfo) {
    return (
      <TaskInfoForm>
        <EditingArea
          focusingField={focusingField}
          setFocusingField={setFocusingField}
        />
        <EditorFooter />
      </TaskInfoForm>
    );
  }

  return <DisplayArea setFocusingField={setFocusingField} />;
}
