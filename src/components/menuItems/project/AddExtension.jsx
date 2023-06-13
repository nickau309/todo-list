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
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ExtensionIcon24 />
        </span>
        <span className="text-sm/6">Add extension…</span>
      </div>
    </MenuItem>
  );
}
