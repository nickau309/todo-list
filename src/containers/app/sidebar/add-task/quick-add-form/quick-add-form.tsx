import { useProjects } from "@/contexts/projects-context";
import { useStore } from "@/contexts/store-context";
import useCreateTask from "@/hooks/task/use-create-task";
import { TaskSchema } from "@/lib/zod";
import type { FormEvent } from "react";
import { useState } from "react";
import CancelButton from "./cancel-button";
import EditingArea from "./editing-area";
import Project from "./project";
import SubmitButton from "./submit-button";

export default function QuickAddForm() {
  const projects = useProjects();

  const { setIsOpen, inputValues } = useStore((state) => ({
    setIsOpen: state.quickAddDialog.setIsOpen,
    inputValues: state.quickAddForm.inputValues,
  }));

  const { mutate } = useCreateTask();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(inputValues);

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
