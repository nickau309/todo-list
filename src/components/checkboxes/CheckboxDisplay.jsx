import React from "react";
import { CheckSmIcon24 } from "@/assets";
import {
  checkboxBgColor as bgColor,
  checkboxTextColor as textColor,
  classNames,
} from "@/utils";

export default function CheckboxDisplay({ isCompleted, priority }) {
  const status = isCompleted ? "check" : "uncheck";

  return (
    <div className="relative grid aspect-square w-6 place-items-center">
      <span
        className={classNames(
          "aspect-square w-[18px] cursor-default rounded-full",
          priority === 4 ? "border" : "border-2",
          bgColor[priority][status],
          textColor[priority],
        )}
      ></span>
      {isCompleted && (
        <span className="pointer-events-none absolute text-white">
          <CheckSmIcon24 />
        </span>
      )}
    </div>
  );
}
