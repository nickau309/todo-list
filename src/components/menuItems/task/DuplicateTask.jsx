import React from "react";
import { useFetcher } from "react-router-dom";
import { DuplicateIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function DuplicateTask({ id }) {
  const fetcher = useFetcher();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        fetcher.submit({ type: "duplicateTask", id }, { method: "post" });
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <DuplicateIcon24 />
        </span>
        <span className="text-[13px]/[16.8px]">Duplicate task</span>
      </div>
    </MenuItem>
  );
}
