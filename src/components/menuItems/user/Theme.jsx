import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeLgIcon24 } from "@/assets";
import { MenuItem } from "./components";

export default function Theme() {
  const { pathname } = useLocation();

  return (
    <MenuItem as={Link} to="/settings/theme" state={{ prevPathname: pathname }}>
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <ThemeLgIcon24 />
        </span>
        <span className="text-[13px]/8">Theme</span>
      </div>
    </MenuItem>
  );
}
