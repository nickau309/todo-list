import React from "react";
import { Link } from "react-router-dom";
import { ActivityIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function ActivityLog() {
  return (
    <MenuItem as={Link} to="/activity">
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <ActivityIcon24 />
        </span>
        <span className="text-[13px]/8">Activity log</span>
      </div>
    </MenuItem>
  );
}
