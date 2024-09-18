import React from "react";
import { NoDateIcon24, ShowCompletedIcon24 } from "@/assets";
import { useSetShowCompleted, useShowCompleted } from "@/contexts";
import { MenuItem } from "./components";

export default function SetShowCompleted() {
  const showCompleted = useShowCompleted();
  const setShowCompleted = useSetShowCompleted();

  return (
    <MenuItem as="button" onClick={() => setShowCompleted(!showCompleted)}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          {showCompleted ? <NoDateIcon24 /> : <ShowCompletedIcon24 />}
        </span>
        <span className="text-sm/6">
          {showCompleted ? "Hide completed" : "Show completed"}
        </span>
      </div>
    </MenuItem>
  );
}
