import React from "react";
import {
  Link,
  useFetchers,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { Menu } from "@headlessui/react";
import { ProjectIcon24 } from "@assets";
import { classNames, textColor } from "@utils";
import ListItemMenu from "./ListItemMenu";

export default function ListItem({ color, id, name }) {
  const fetchers = useFetchers();
  const { incompleteTasksCountMap: countMap } = useLoaderData();
  const { pathname } = useLocation();

  const relevantFetcher = fetchers.find(
    (f) => f.formData && f.formData.get("id") === id
  );
  const displayColor = relevantFetcher?.formData.get("color") ?? color;
  const href = "/project/" + id;
  const incompleteTaskCount = countMap.get(id);
  const displayName = relevantFetcher?.formData.get("name") ?? name;

  return (
    <Menu>
      {({ open }) => (
        <li
          className={classNames(
            "group/item flex items-center rounded-[5px] pr-0.5",
            open || pathname.startsWith(href)
              ? "bg-base-primary-hover"
              : "hover:bg-base-primary-hover"
          )}
        >
          <Link
            to={href}
            className={classNames(
              "flex min-w-0 grow items-center gap-[5px] rounded-[5px] p-[5px]",
              "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]"
            )}
          >
            <span className={textColor[displayColor]}>
              <ProjectIcon24 />
            </span>
            <span className="grow select-none truncate py-[3px] text-sm/[17px] text-base-primary">
              {displayName}
            </span>
          </Link>
          <div className="relative grid h-6 w-6 shrink-0 place-items-center">
            <span
              className={classNames(
                "select-none text-xs/6 text-count",
                open
                  ? "opacity-0"
                  : "opacity-100 group-focus-within/item:opacity-0 group-hover/item:opacity-0"
              )}
            >
              {incompleteTaskCount}
            </span>
            <ListItemMenu id={id} open={open} />
          </div>
        </li>
      )}
    </Menu>
  );
}
