import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ExtensionIcon24 } from "@assets";
import { MenuItem } from "./components";

export default function AddExtension() {
  const { pathname } = useLocation();

  return (
    <MenuItem
      as={Link}
      to="/settings/integrations/browse/collections/ui-extensions"
      state={{ prevPathname: pathname }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <ExtensionIcon24 />
        </span>
        <span className="text-[13px]/[16.8px]">Add extension…</span>
      </div>
    </MenuItem>
  );
}
