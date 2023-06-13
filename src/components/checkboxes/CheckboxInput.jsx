import React, { useEffect, useRef } from "react";
import { useFetcher, useFetchers, useLoaderData } from "react-router-dom";
import { CheckSmIcon24 } from "@assets";
import {
  classNames,
  checkboxAnimations as animations,
  checkboxBgColor as bgColor,
  checkboxCheckedBgColor as checkedBgColor,
  checkboxDisabledBgColor as disabledBgColor,
  checkboxDisabledTextColor as disabledTextColor,
  checkboxTextColor as textColor,
} from "@utils";

export default function CheckboxInput({ className, disabled, taskId }) {
  const fetcher = useFetcher();
  const fetchers = useFetchers();
  const { tasks } = useLoaderData();

  const releventFetcher = fetchers.find(
    (f) => f.formData && f.formData.get("id") === taskId
  );

  const priority = releventFetcher?.formData?.get("priority")
    ? Number(releventFetcher.formData.get("priority"))
    : tasks.find((t) => t.id === taskId).priority;

  const isCompleted = fetcher.formData
    ? fetcher.formData.get("isCompleted") === "true"
    : tasks.find((t) => t.id === taskId).isCompleted;

  const inputRef = useRef();

  useEffect(() => {
    if (!disabled) {
      const node = inputRef.current;

      const classMutationOnAnimationStart = () => {
        node.classList.remove(checkedBgColor[priority]);
      };
      const classMutationOnAnimationEnd = () => {
        node.classList.remove(
          animations[priority].check,
          animations[priority].uncheck
        );
        node.classList.add(checkedBgColor[priority]);
      };

      node.addEventListener("animationstart", classMutationOnAnimationStart);
      node.addEventListener("animationend", classMutationOnAnimationEnd);
      return () => {
        node.removeEventListener(
          "animationstart",
          classMutationOnAnimationStart
        );
        node.removeEventListener("animationend", classMutationOnAnimationEnd);
      };
    }
  }, [disabled, priority]);

  const status = isCompleted ? "check" : "uncheck";

  return (
    <div
      className={classNames(
        "relative grid aspect-square w-6 place-items-center",
        disabled ? disabledTextColor[priority] : textColor[priority]
      )}
    >
      <input
        type="checkbox"
        ref={inputRef}
        checked={isCompleted}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.target.classList.add(
            animations[priority][e.target.checked ? "check" : "uncheck"]
          );
          fetcher.submit(
            { type: "updateTask", id: taskId, isCompleted: e.target.checked },
            { method: "post" }
          );
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            fetcher.submit(
              {
                type: "updateTask",
                id: taskId,
                isCompleted: !e.target.checked,
              },
              { method: "post" }
            );
          }
        }}
        disabled={disabled}
        className={classNames(
          "peer aspect-square w-[18px] appearance-none rounded-full",
          priority === 4 ? "border" : "border-2",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          disabled && disabledBgColor[priority][status],
          !disabled && bgColor[priority].uncheck,
          !disabled && checkedBgColor[priority],
          className
        )}
      />
      <span
        className={classNames(
          "pointer-events-none absolute transition ease-in",
          isCompleted
            ? "text-white opacity-100"
            : "opacity-0 peer-enabled:peer-hover:opacity-100"
        )}
      >
        <CheckSmIcon24 />
      </span>
    </div>
  );
}
