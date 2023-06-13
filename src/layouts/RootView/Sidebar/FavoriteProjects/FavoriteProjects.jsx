import React from "react";
import { useLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon16 } from "@assets";
import { AnimatedDisclosurePanel } from "@components";
import { classNames } from "@utils";
import ListItem from "./ListItem";

export default function FavoriteProjects() {
  const { projects } = useLoaderData();

  const favoriteProjects = projects.filter(
    (p) => !p.isArchived && p.isFavorite
  );

  if (!favoriteProjects.length) {
    return null;
  }

  return (
    <Disclosure as="div" defaultOpen>
      {({ open }) => (
        <>
          <div className="flex items-center p-1 pr-0">
            <span className="flex h-7 grow select-none items-center pr-1 font-reactist text-sm font-semibold text-content-secondary">
              Favorites
            </span>
            <div className="flex">
              <Disclosure.Button
                type="button"
                className={classNames(
                  "flex aspect-square h-7 items-center justify-center rounded-[5px] border border-transparent font-reactist text-[13px] font-semibold text-quaternary-tint transition-opacity	ease-in",
                  "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
                  "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
                  "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
                  "opacity-0 group-focus-within/sidebar:opacity-100 group-hover/sidebar:opacity-100",
                  "disabled:cursor-not-allowed disabled:text-quaternary-disabled-tint"
                )}
              >
                <ChevronDownIcon16 className="transition-transform ui-not-open:rotate-90" />
              </Disclosure.Button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <AnimatedDisclosurePanel>
                <ul>
                  {favoriteProjects.map((p) => (
                    <ListItem
                      key={p.id}
                      color={p.color}
                      id={p.id}
                      name={p.name}
                    />
                  ))}
                </ul>
              </AnimatedDisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
