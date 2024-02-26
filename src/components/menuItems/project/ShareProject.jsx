import React from "react";
import { Link } from "react-router-dom";
import { ShareOptionIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function ShareProject({ id }) {
  return (
    <MenuItem as={Link} to={`/project/${id}/share`}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ShareOptionIcon24 />
        </span>
        <span className="text-sm/6">Share project</span>
      </div>
    </MenuItem>
  );
}
