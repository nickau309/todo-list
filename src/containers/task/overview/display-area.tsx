import { DescriptionIcon16 } from "@/assets";
import {
  EditorContent,
  useDescriptionViewer,
  useNameViewer,
} from "@/features/editor";
import type { TaskInfoKeyType } from "@/types/task";
import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";
import { useId } from "react";
import { useOptimisticTask } from "../contexts/optimistic-task-context";
import { useTaskControl } from "../contexts/task-context";
import { useTaskInfoFormContext } from "../contexts/task-info-form-context";

type AreaProps = {
  setFocusingField: Dispatch<SetStateAction<TaskInfoKeyType | null>>;
};

export default function DisplayArea({ setFocusingField }: AreaProps) {
  const {
    name,
    description,
    isCompleted,
    project: { isArchived },
  } = useOptimisticTask();

  const { setIsEditingInfo } = useTaskControl();

  const nameAriaId = useId();
  const descriptionAriaId = useId();

  const nameViewer = useNameViewer({
    name,
    isTaskCompleted: isCompleted,
  });

  const descriptionEditor = useDescriptionViewer({
    description,
    isTaskCompleted: isCompleted,
  });

  const { reset } = useTaskInfoFormContext();

  const disabled = isCompleted || isArchived;

  if (disabled) {
    return (
      <div className="ml-[7px] mr-[5px] flex min-w-0 flex-1 flex-col gap-2">
        <div
          className={
            isCompleted
              ? "line-through decoration-display-secondary-idle-tint"
              : undefined
          }
        >
          <EditorContent
            editor={nameViewer}
            className="font-sans text-xl/[22px] font-semibold tracking-[-.15px]"
          />
        </div>
        {description.length !== 0 && (
          <div>
            <EditorContent
              editor={descriptionEditor}
              className="font-sans text-sm/[1.65]"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ml-[7px] mr-[5px] flex min-w-0 flex-1 flex-col gap-2 pb-1">
      <div
        role="button"
        aria-label="Task name"
        aria-describedby={nameAriaId}
        onClick={(e) => {
          if (e.target instanceof Element && e.target.closest("a") === null) {
            setIsEditingInfo(true);
            setFocusingField("name");
            reset({ name, description });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsEditingInfo(true);
            setFocusingField("name");
            reset({ name, description });
          }
        }}
        tabIndex={0}
        className={clsx(
          "cursor-text rounded-[3px]",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        )}
      >
        <EditorContent
          editor={nameViewer}
          className="font-sans text-xl/[22px] font-semibold tracking-[-.15px]"
        />
        <div id={nameAriaId} className="sr-only">
          Activate to edit the task name
        </div>
      </div>
      <div
        role="button"
        aria-label="Task description"
        aria-describedby={descriptionAriaId}
        onClick={(e) => {
          if (e.target instanceof Element && e.target.closest("a") === null) {
            setIsEditingInfo(true);
            setFocusingField("description");
            reset({ name, description });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsEditingInfo(true);
            setFocusingField("description");
            reset({ name, description });
          }
        }}
        tabIndex={0}
        className={clsx(
          "cursor-text rounded-[3px]",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "focus-visible:border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        )}
      >
        {description.length === 0 ? (
          <div className="-ml-1 flex items-center">
            <span className="text-display-tertiary-idle-tint">
              <DescriptionIcon16 />
            </span>
            <span className="text-sm/[1.65] text-display-tertiary-idle-tint">
              Description
            </span>
          </div>
        ) : (
          <EditorContent
            editor={descriptionEditor}
            className="font-sans text-sm/[1.65]"
          />
        )}
        <div id={descriptionAriaId} className="sr-only">
          Activate to edit the task description
        </div>
      </div>
    </div>
  );
}
