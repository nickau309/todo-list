import { connectLabel, disconnectLabel } from "@/actions/task";
import { AddSmIcon24, LabelIconOutline24, RemoveIcon24 } from "@/assets";
import { bgColor20, bgHoverColor50, bgHoverColor80 } from "@/constants/color";
import {
  LabelsDropdown,
  LabelsDropdownButton,
  LabelsDropdownPanel,
} from "@/features/labels-dropdown";
import type { LabelType } from "@/types/label";
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

  const removeLabel = useCallback(
    (labelId: number) => {
      startTransition(() => {
        setOptimisticTask((optimisticTask) => ({
          ...optimisticTask,
          labels: optimisticTask.labels.filter((l) => l.id !== labelId),
        }));
      });
      const formData = new FormData();
      formData.append("labelId", String(labelId));
      void disconnectLabel(id, formData);
    },
    [id, setOptimisticTask],
  );

  const toggleLabel = useCallback(
    (label: LabelType) => {
      const isConnected = labels.some((l) => l.id === label.id);
      if (isConnected) {
        removeLabel(label.id);
      } else {
        startTransition(() => {
          setOptimisticTask((optimisticTask) => ({
            ...optimisticTask,
            labels: [...optimisticTask.labels, label].sort(
              (a, b) => a.childOrder - b.childOrder,
            ),
          }));
        });
        const formData = new FormData();
        formData.append("labelId", String(label.id));
        void connectLabel(id, formData);
      }
    },
    [id, labels, removeLabel, setOptimisticTask],
  );

  return (
    <LabelsDropdown
      disabled={disabled}
      labels={labels}
      toggleLabel={toggleLabel}
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
                  <span className="truncate text-[13px]/8">
                    {showAll ? "Show less" : "Show more"}
                  </span>
                </button>
              )}
              <LabelsDropdownButton
                type="button"
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
                <span className="truncate text-xs/7 font-semibold">Add</span>
              </LabelsDropdownButton>
            </div>
          </div>
        ) : (
          <LabelsDropdownButton
            type="button"
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
            <span className="truncate text-sm/8">Add labels</span>
          </LabelsDropdownButton>
        )}
      </div>
      <LabelsDropdownPanel />
    </LabelsDropdown>
  );
}
