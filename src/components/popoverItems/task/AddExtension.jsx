import React from "react";
import { useLocation } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { ExtensionIcon24 } from "@assets";
import { LinkButton } from "./components";

export default function AddExtension() {
  const { pathname } = useLocation();

  return (
    <Popover.Button
      as={LinkButton}
      to="/settings/integrations/browse/collections/ui-extensions"
      state={{ prevPathname: pathname }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ExtensionIcon24 />
        </span>
        <span className="text-sm/6">Add extension…</span>
      </div>
    </Popover.Button>
  );
}
