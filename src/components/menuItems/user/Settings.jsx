import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Cog8ToothSmIcon24 } from "@assets";
import { MenuItem } from "./components";

export default function Settings() {
  const { pathname } = useLocation();

  return (
    <MenuItem as={Link} to="/settings" state={{ prevPathname: pathname }}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3.5 pl-[3px]">
          <div className="rounded-full border border-black/10">
            <span className="grid aspect-square w-[50px] place-items-center rounded-full border-[3px] bg-default text-2xl/[44px] text-username">
              u
            </span>
          </div>
          <div className="flex flex-col items-start gap-[3px]">
            <span className="text-[13px]/[16.8px] font-bold">username</span>
            <span className="text-[13px]/[16.8px] text-content-secondary">
              username@fakemail.com
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-content-secondary">
            <Cog8ToothSmIcon24 />
          </span>
          <span className="text-[13px]/8">Settings</span>
        </div>
      </div>
    </MenuItem>
  );
}
