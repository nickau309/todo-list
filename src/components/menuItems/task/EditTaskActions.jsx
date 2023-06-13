import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "./components";

export default function EditTaskActions() {
  const { pathname } = useLocation();

  return (
    <MenuItem
      as={Link}
      to="/settings/quick-customization"
      state={{ prevPathname: pathname }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-[13px]/[16.8px] text-[#db4c3f]">
          Edit task actions
        </span>
      </div>
    </MenuItem>
  );
}
