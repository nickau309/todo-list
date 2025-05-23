import { updateLabels } from "@/actions/task";
import { AddSmIcon24, LabelIconOutline24, RemoveIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { bgColor20, bgHoverColor50, bgHoverColor80 } from "@/constants/color";
import {
  LabelsDropdown,
  LabelsDropdownButton,
  LabelsDropdownPanel,
} from "@/features/labels-dropdown";
import clsx from "clsx";
import Link from "next/link";
import type { RefCallback } from "react";
import { startTransition, useCallback, useState } from "react";
import {
  useOptimisticTask,
  useSetOptimisticTask,
} from "../contexts/optimistic-task-context";

type LabelsProps = {
  disabled?: boolean;
};

export default function Labels({ disabled = false }: LabelsProps) {
  const [showButton, setShowButton] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const ref: RefCallback<HTMLDivElement> = useCallback((node) => {
    if (node === null) {
      return;
    }

    setShowButton(node.scrollHeight > 64);

    const mutationObserver = new MutationObserver(() => {
      setShowButton(node.scrollHeight > 64);
    });
    mutationObserver.observe(node, { subtree: true, childList: true });
  }, []);

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
    <LabelsDropdown
      labelIds={labelIds}
      setLabelIds={setLabelIds}
      disabled={disabled}
    >
      <div className="flex items-center px-3">
        {labels.length > 0 ? (
          <div className="flex min-w-0 flex-1 items-start gap-3 py-2 pl-1.5 pr-4">
            <span
              className={clsx(
                disabled
                  ? "text-actionable-quaternary-disabled-tint"
                  : "text-display-secondary-idle-tint",
                "transition-colors duration-300",
              )}
            >
              <LabelIconOutline24 />
            </span>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <div
                ref={ref}
                className={clsx(
                  !showAll && "max-h-16",
                  "w-full overflow-hidden",
                )}
              >
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
                    <Text
                      overflow="truncate"
                      font="sans"
                      size="14px"
                      height="18.4px"
                    >
                      {label.name}
                    </Text>
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
              {showButton && (
                <button
                  type="button"
                  aria-disabled="false"
                  onClick={() => {
                    setShowAll((prev) => !prev);
                  }}
                  className={clsx(
                    "flex h-8 min-w-[68px] select-none items-center rounded-[5px] border border-transparent px-3 file:h-8",
                    "text-actionable-tertiary-idle-tint",
                    "transition-colors duration-300",
                    "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-tertiary-disabled-tint",
                    "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                    "custom-hocus:bg-actionable-tertiary-hover-fill custom-hocus:text-actionable-tertiary-hover-tint",
                  )}
                >
                  <Text
                    overflow="truncate"
                    font="reactist"
                    size="13px"
                    height="32px"
                  >
                    {showAll ? "Show less" : "Show more"}
                  </Text>
                </button>
              )}
              <LabelsDropdownButton
                className={clsx(
                  "-mx-2 flex h-7 min-w-[68px] select-none items-center justify-center gap-0.5 rounded-[5px] border border-transparent pl-0.5 pr-2",
                  "text-actionable-quaternary-idle-tint",
                  "transition-colors duration-300",
                  "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
                  "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
                  "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
                )}
              >
                <span>
                  <AddSmIcon24 />
                </span>
                <Text
                  overflow="truncate"
                  font="reactist"
                  size="12px"
                  weight={600}
                  height="28px"
                >
                  Add
                </Text>
              </LabelsDropdownButton>
            </div>
          </div>
        ) : (
          <LabelsDropdownButton
            className={clsx(
              "group",
              "flex h-10 min-w-[68px] flex-1 select-none items-center gap-3.5 rounded-[5px] pl-1.5 pr-3",
              "text-display-secondary-idle-tint",
              "transition-colors duration-300",
              "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
              "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
            )}
          >
            <span>
              <LabelIconOutline24 />
            </span>
            <Text overflow="truncate" font="reactist" size="14px" height="32px">
              Add labels
            </Text>
          </LabelsDropdownButton>
        )}
      </div>
      <LabelsDropdownPanel />
    </LabelsDropdown>
  );
}
