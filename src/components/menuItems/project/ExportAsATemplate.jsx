import React from "react";
import { Link } from "react-router-dom";
import { ExportIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function ExportAsATemplate() {
  return (
    <MenuItem as={Link} to="export">
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ExportIcon24 />
        </span>
        <span className="text-sm/6">Export as a template</span>
      </div>
    </MenuItem>
  );
}
