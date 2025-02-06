import { updateLabels } from "@/actions/task";
import { AddSmIcon24, RemoveIcon24 } from "@/assets";
import { bgColor20, bgHoverColor50, bgHoverColor80 } from "@/constants/color";
import {
  LabelsDropdown,
  LabelsDropdownButton,
  LabelsDropdownPanel,
} from "@/features/labels-dropdown";
import clsx from "clsx";
import Link from "next/link";
import { startTransition, useCallback } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";

type LabelsProps = {
  disabled?: boolean;
};

export default function Labels({ disabled = false }: LabelsProps) {
  const { id, labels } = useOptimisticTask();
  const setOptimisticTask = useSetOptimisticTask();

  const labelIds = labels.map((label) => label.id);

  const removeLabel = (removeLabelId: number) => {
    startTransition(() => {
      setOptimisticTask((optimisticTask) => ({
        ...optimisticTask,
        labels: optimisticTask.labels.filter((l) => l.id !== removeLabelId),
      }));
    });
    const formData = new FormData();
    for (const labelId of labelIds) {
      if (labelId !== removeLabelId) {
        formData.append("labelId", String(labelId));
      }
    }
    void updateLabels(id, formData);
  };

  const setLabelIds = useCallback(
    (labelIds: number[]) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          labels: labels.filter((label) => labelIds.includes(label.id)),
        }));
      });
      const formData = new FormData();
      for (const labelId of labelIds) {
        formData.append("labelId", String(labelId));
      }
      void updateLabels(id, formData);
    },
    [id, labels, setOptimisticTask],
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="-mx-2 flex flex-col">
        <LabelsDropdown
          labelIds={labelIds}
          setLabelIds={setLabelIds}
          disabled={disabled}
        >
          <LabelsDropdownButton
            className={clsx(
              "group flex h-7 min-w-[68px] select-none items-center gap-0.5 rounded-[5px] border border-transparent pl-2 pr-0.5",
              "text-actionable-quaternary-idle-tint",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
              "custom-hocus:bg-selectable-secondary-selected-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span className="flex-1 truncate text-left text-xs/7 font-semibold">
              Labels
            </span>
            <span>
              <AddSmIcon24 />
            </span>
          </LabelsDropdownButton>
          <LabelsDropdownPanel />
        </LabelsDropdown>
      </div>
      {labels.length > 0 && (
        <div className="max-h-64 overflow-y-auto overflow-x-hidden">
          {labels.map((label) => (
            <Link
              key={label.id}
              href={`/app/label/${label.id}`}
              className={clsx(
                "mb-1 mr-1 inline-flex h-7 max-w-full items-center gap-1 rounded-[5px]",
                bgColor20[label.color],
                "px-2",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-display-secondary-idle-tint",
                bgHoverColor50[label.color],
              )}
            >
              <span className="truncate font-sans text-sm/[18.4px]">
                {label.name}
              </span>
              {!disabled && (
                <button
                  type="button"
                  aria-disabled={disabled}
                  aria-label="Remove label"
                  onClick={(e) => {
                    e.preventDefault();
                    removeLabel(label.id);
                  }}
                  className={clsx(
                    "-mr-1 rounded-[3px]",
                    "text-display-secondary-idle-tint",
                    "focus-visible:text-display-primary-idle-tint focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-display-secondary-idle-tint",
                    bgHoverColor80[label.color],
                    "custom-hover:text-display-primary-idle-tint",
                  )}
                >
                  <RemoveIcon24 className="size-5" />
                </button>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
