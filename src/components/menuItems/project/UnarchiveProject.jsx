import React from "react";
import { useFetcher } from "react-router-dom";
import { UnarchiveIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function UnarchiveProject({ id }) {
  const fetcher = useFetcher();

  return (
    <MenuItem
      as="button"
      onClick={() => {
        fetcher.submit(
          { type: "updateProject", id, isArchived: false },
          { method: "post" },
        );
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <UnarchiveIcon24 />
        </span>
        <span className="text-sm/6">Unarchive project</span>
      </div>
    </MenuItem>
  );
}
