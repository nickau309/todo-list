import { DescriptionIcon16 } from "@/assets";
import {
  EditorContent,
  FloatingDescriptionToolbar,
  FloatingLinkEditor,
  FloatingNameToolbar,
  useDescriptionEditor,
  useNameEditor,
} from "@/features/editor";
import type { TaskInfoKeyType } from "@/types/task";
import clsx from "clsx";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useTaskInfoFormController } from "../contexts/task-info-form-context";

type AreaProps = {
  focusingField: TaskInfoKeyType | null;
  setFocusingField: Dispatch<SetStateAction<TaskInfoKeyType | null>>;
};

export default function EditingArea({
  focusingField,
  setFocusingField,
}: AreaProps) {
  const {
    field: { onChange: onNameChange, value: name },
    fieldState: { error: nameError },
  } = useTaskInfoFormController({ name: "name" });

  const {
    field: { onChange: onDescriptionChange, value: description },
    fieldState: { error: descriptionError },
  } = useTaskInfoFormController({ name: "description" });

  const nameEditor = useNameEditor({
    focusingField,
    setFocusingField,
    name,
    setName: onNameChange,
  });

  const descriptionEditor = useDescriptionEditor({
    focusingField,
    setFocusingField,
    description,
    setDescription: onDescriptionChange,
  });

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (focusingField === "name") {
        nameEditor?.commands.focus();
      } else if (focusingField === "description") {
        descriptionEditor?.commands.focus();
      }
    }
  };

  let message: string | null = null;
  const showNameError = !!nameError && nameError.type === "too_big";
  const showDescriptionError = !!descriptionError;
  if (showNameError && showDescriptionError) {
    if (focusingField === "name") {
      message = nameError.message ?? null;
    } else if (focusingField === "description") {
      message = descriptionError.message ?? null;
    }
  } else if (showNameError) {
    message = nameError.message ?? null;
  } else if (showDescriptionError) {
    message = descriptionError.message ?? null;
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "ml-[3px] box-content flex min-h-[105px] cursor-text flex-col rounded-[10px] border border-input-idle px-[7px] py-1",
        "focus-within:border-input-focus",
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <EditorContent
            editor={nameEditor}
            className="min-w-0 flex-1 font-sans text-xl/tight font-semibold"
          />
          {nameEditor !== null && (
            <>
              <FloatingLinkEditor editor={nameEditor} />
              <FloatingNameToolbar editor={nameEditor} />
            </>
          )}
        </div>
        <div className="flex items-center">
          {description.length === 0 && (
            <span className="-ml-[3px] text-display-tertiary-idle-tint">
              <DescriptionIcon16 />
            </span>
          )}
          <EditorContent
            editor={descriptionEditor}
            className="min-w-0 flex-1 font-sans text-sm/[1.65]"
          />
          {descriptionEditor !== null && (
            <>
              <FloatingLinkEditor editor={descriptionEditor} />
              <FloatingDescriptionToolbar editor={descriptionEditor} />
            </>
          )}
        </div>
      </div>
      <div role="alert" aria-atomic="true" aria-live="assertive">
        {message !== null && (
          <p className="mb-1.5 mt-1 font-sans text-xs text-info-attention-primary-idle-tint">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
