import React, { useEffect, useRef } from "react";
import {
  Link,
  useFetchers,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { Reorder } from "framer-motion";
import { Menu } from "@headlessui/react";
import { ProjectIcon24 } from "@/assets";
import { useWidth } from "@/contexts";
import { classNames, textColor } from "@/utils";
import ReorderItemMenu from "./ReorderItemMenu";

export default function ReorderItem({
  id,
  isDragging,
  setDraggingId,
  setProjectOrder,
}) {
  const fetchers = useFetchers();
  const { incompleteTasksCountMap: countMap, projects } = useLoaderData();
  const { pathname } = useLocation();

  const itemRef = useRef();

  const width = useWidth();

  useEffect(() => {
    if (isDragging) {
      const item = itemRef.current;
      const placeholder = item.nextElementSibling;
      placeholder.style.height = item.scrollHeight + "px";
    }
  }, [isDragging, width]);

  const doNthWhileDrag = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  const relevantFetcher = fetchers.find(
    (f) => f.formData && f.formData.get("id") === id,
  );
  const project = projects.find((p) => p.id === id);

  const color = relevantFetcher?.formData.get("color") ?? project.color;
  const href = "/project/" + id;
  const incompleteTaskCount = countMap.get(id);
  const name = relevantFetcher?.formData.get("name") ?? project.name;

  return (
    <>
      <Menu>
        {({ open }) => (
          <Reorder.Item
            value={id}
            drag
            dragTransition={{
              bounceStiffness: 1e5,
              bounceDamping: 1e5,
            }}
            onDragStart={() => setDraggingId(id)}
            onDragEnd={() => {
              setDraggingId(null);
              setProjectOrder();
            }}
            transition={{ duration: 0 }}
            ref={itemRef}
            className={classNames(
              "group/item flex w-full items-center rounded-[5px] pr-0.5",
              isDragging &&
                "absolute bg-base-primary-hover shadow-[0_5px_8px_rgba(0,0,0,.16)]",
              open || pathname.startsWith(href)
                ? "bg-base-primary-hover"
                : "hover:bg-base-primary-hover",
            )}
          >
            <Link
              to={href}
              onClick={doNthWhileDrag}
              draggable="false"
              className={classNames(
                "flex min-w-0 grow items-center gap-[5px] rounded-[5px] p-[5px]",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
              )}
            >
              <span className={textColor[color]}>
                <ProjectIcon24 />
              </span>
              <span className="grow select-none truncate py-[3px] text-sm/[17px] text-base-primary">
                {name}
              </span>
            </Link>
            <div className="relative grid h-6 w-6 shrink-0 place-items-center">
              <span
                className={classNames(
                  "select-none text-xs/6 text-count",
                  open
                    ? "opacity-0"
                    : "opacity-100 group-focus-within/item:opacity-0 group-hover/item:opacity-0",
                )}
              >
                {incompleteTaskCount}
              </span>
              <ReorderItemMenu
                id={id}
                onClick={doNthWhileDrag}
                open={open}
                name={name}
              />
            </div>
          </Reorder.Item>
        )}
      </Menu>
      {isDragging && (
        <li className="rounded-[5px] bg-drag-placeholder-secondary"></li>
      )}
    </>
  );
}
