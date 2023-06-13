import React from "react";
import { CheckSmIcon24 } from "@assets";
import {
  checkboxBgColor as bgColor,
  checkboxTextColor as textColor,
  classNames,
} from "@utils";

export default function CheckboxDisplayMini({ isCompleted, priority }) {
  const status = isCompleted ? "check" : "uncheck";

  return (
    <div className="relative grid h-6 w-3.5 place-items-center">
      <span
        className={classNames(
          "aspect-square w-3.5 rounded-full",
          priority === 4 ? "border" : "border-2",
          bgColor[priority][status],
          textColor[priority]
        )}
      ></span>
      {isCompleted && (
        <span className="absolute text-white">
          <CheckSmIcon24 />
        </span>
      )}
    </div>
  );
}
