import { useStore } from "@/contexts/store-context";
import type { TaskInfoKeyType } from "@/types/task";
import type { MouseEvent } from "react";
import { useRef, useState } from "react";
import Description from "./description";
import DueDate from "./due-date";
import Labels from "./labels";
import Location from "./location";
import MoreActions from "./more-action";
import Name from "./name";
import Priority from "./priority";
import Reminders from "./reminders";
import type { EditorRef } from "./type";

type AreaProps = {
  descriptionError?: string;
  isSubmitDisabled?: boolean;
  nameError?: string;
};

export default function EditingArea({
  descriptionError,
  isSubmitDisabled = false,
  nameError,
}: AreaProps) {
  const name = useStore((state) => state.quickAddForm.inputValues.name);

  const [focusingField, setFocusingField] = useState<TaskInfoKeyType | null>(
    null,
  );

  const nameRef = useRef<EditorRef | null>(null);
  const descriptionRef = useRef<EditorRef | null>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (focusingField === "name") {
        nameRef.current?.focus();
      } else if (focusingField === "description") {
        descriptionRef.current?.focus();
      }
    }
  };

  const showNameError = !!nameError && name.length > 0;
  const showDescriptionError = !!descriptionError;

  let message: string | null = null;
  if (showNameError && showDescriptionError) {
    if (focusingField === "name") {
      message = nameError;
    } else if (focusingField === "description") {
      message = descriptionError;
    }
  } else if (showNameError) {
    message = nameError;
  } else if (showDescriptionError) {
    message = descriptionError;
  }

  return (
    <div onClick={handleClick} className="cursor-text p-4">
      <div className="mb-2.5 flex max-h-[200px] flex-col gap-1 overflow-y-auto overflow-x-hidden">
        <Name
          ref={nameRef}
          focusingField={focusingField}
          setFocusingField={setFocusingField}
          isSubmitDisabled={isSubmitDisabled}
        />
        <Description
          ref={descriptionRef}
          focusingField={focusingField}
          setFocusingField={setFocusingField}
        />
      </div>
      <div role="alert" aria-atomic="true" aria-live="assertive">
        {message !== null && (
          <p className="mb-2.5 font-sans text-xs text-info-attention-primary-idle-tint">
            {message}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <DueDate />
        <Priority />
        <Reminders />
        <Labels />
        <Location />
        <MoreActions />
      </div>
    </div>
  );
}
