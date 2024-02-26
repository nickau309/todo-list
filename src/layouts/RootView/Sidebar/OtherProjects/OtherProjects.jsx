import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { AddIcon13, ChevronDownIcon16 } from "@/assets";
import { AnimatedDisclosurePanel } from "@/components";
import { useDialogControl, useTheme } from "@/contexts";
import { classNames } from "@/utils";
import ReorderGroup from "./ReorderGroup";

export default function OtherProjects() {
  const { pathname } = useLocation();

  const { openDialog } = useDialogControl();
  const { name } = useTheme();

  const href = "/projects";

  return (
    <Disclosure as="div" defaultOpen>
      {({ open }) => (
        <>
          <div
            className={classNames(
              "flex items-center rounded-[5px] p-1 pr-0",
              name !== "Dark" && pathname.startsWith(href) && "bg-[#eee]",
              name !== "Dark" && "focus-within:bg-[#eee] hover:bg-[#eee]",
            )}
          >
            <Link
              to={href}
              className={classNames(
                "flex h-7 grow select-none items-center rounded-[5px] pr-1 font-reactist text-sm font-semibold text-content-secondary",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
              )}
            >
              Projects
            </Link>
            <div className="flex">
              <button
                type="button"
                onClick={() => openDialog("AddProject")}
                className={classNames(
                  "flex aspect-square h-7 items-center justify-center rounded-[5px] border border-transparent font-reactist text-[13px] font-semibold text-quaternary-tint transition-opacity	ease-in",
                  "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
                  "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
                  "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
                  "opacity-0 group-focus-within/sidebar:opacity-100 group-hover/sidebar:opacity-100",
                  "disabled:cursor-not-allowed disabled:text-quaternary-disabled-tint",
                )}
              >
                <AddIcon13 />
              </button>
              <Disclosure.Button
                type="button"
                className={classNames(
                  "flex aspect-square h-7 items-center justify-center rounded-[5px] border border-transparent font-reactist text-[13px] font-semibold text-quaternary-tint transition-opacity	ease-in",
                  "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
                  "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
                  "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
                  "opacity-0 group-focus-within/sidebar:opacity-100 group-hover/sidebar:opacity-100",
                  "disabled:cursor-not-allowed disabled:text-quaternary-disabled-tint",
                )}
              >
                <ChevronDownIcon16 className="transition-transform ui-not-open:rotate-90" />
              </Disclosure.Button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <AnimatedDisclosurePanel>
                <ReorderGroup />
              </AnimatedDisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
