import React from "react";
import { Menu } from "@headlessui/react";

export default function MenuItem({ children, ...attr }) {
  return (
    <Menu.Item
      className="px-2.5 py-1 ui-active:bg-menu-item-primary-hover"
      {...attr}
    >
      {children}
    </Menu.Item>
  );
}
