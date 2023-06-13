import React from "react";
import { Menu } from "@headlessui/react";

export default function MenuItem({ children, ...attr }) {
  return (
    <Menu.Item
      className="rounded-[5px] px-1.5 ui-active:bg-focus-fill"
      {...attr}
    >
      {children}
    </Menu.Item>
  );
}
