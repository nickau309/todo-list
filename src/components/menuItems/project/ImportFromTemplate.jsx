import React from "react";
import { Link } from "react-router-dom";
import { ImportIcon24 } from "@assets";
import { MenuItem } from "./components";

export default function ImportFromTemplate() {
  return (
    <MenuItem as={Link} to="import">
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ImportIcon24 />
        </span>
        <span className="text-sm/6">Import from template</span>
      </div>
    </MenuItem>
  );
}
