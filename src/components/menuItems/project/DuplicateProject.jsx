import React from "react";
import { useFetcher } from "react-router-dom";
import { DuplicateIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function DuplicateProject({ id }) {
  const fetcher = useFetcher();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        fetcher.submit({ type: "duplicateProject", id }, { method: "post" });
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <DuplicateIcon24 />
        </span>
        <span className="text-sm/6">Duplicate project</span>
      </div>
    </MenuItem>
  );
}
