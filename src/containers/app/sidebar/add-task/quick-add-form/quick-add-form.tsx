import { createTask } from "@/actions/task";
import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import { useStore } from "@/contexts/store-context";
import { TaskSchema } from "@/lib/zod";
import type { FormEvent } from "react";
import { useState } from "react";
import CancelButton from "./cancel-button";
import EditingArea from "./editing-area";
import Project from "./project";
import SubmitButton from "./submit-button";

export default function QuickAddForm() {
  const { projects } = useOptimisticUser();

  const { setIsOpen, inputValues } = useStore((state) => ({
    setIsOpen: state.quickAddDialog.setIsOpen,
    inputValues: state.quickAddForm.inputValues,
  }));

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputValues.name);
    formData.append("description", inputValues.description);
    if (inputValues.dueDate !== null) {
      formData.append("dueDate", inputValues.dueDate.toISOString());
    }
    formData.append("priority", String(inputValues.priority));
    for (const labelId of inputValues.labelIds) {
      formData.append("labelId", String(labelId));
    }
    formData.append("projectId", `${inputValues.projectId ?? projects[0].id}`);
    void createTask(formData);

    setIsSubmitted(true);
    setIsOpen(false);
  };

  const parsed = TaskSchema.safeParse(inputValues);
  const isValid = parsed.success;
  const errors = parsed.error?.flatten().fieldErrors;

  const nameError = errors?.name?.[0];
  const descriptionError = errors?.description?.[0];

  return (
    <form onSubmit={handleSubmit} className="divide-y divide-input-idle">
      <EditingArea
        descriptionError={descriptionError}
        isSubmitDisabled={isSubmitted || !isValid}
        nameError={nameError}
      />
      <div className="flex justify-between gap-2 p-4">
        <Project />
        <div className="flex items-center gap-2">
          <CancelButton />
          <SubmitButton disabled={isSubmitted || !isValid} />
        </div>
      </div>
    </form>
  );
}
