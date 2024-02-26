import React from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { TodayIcon24 } from "@/assets";
import { classNames } from "@/utils";

export default function Today() {
  const { incompleteTasksCountMap: countMap, isOverdue } = useLoaderData();
  const { pathname } = useLocation();

  const href = "/today";
  const incompleteTaskCount = countMap.get("today");

  return (
    <li
      className={classNames(
        "group/item flex items-center rounded-[5px] pr-0.5",
        pathname.startsWith(href)
          ? "bg-base-primary-hover"
          : "hover:bg-base-primary-hover",
      )}
    >
      <Link
        to={href}
        className={classNames(
          "flex min-w-0 grow items-center gap-[5px] rounded-[5px] p-[5px]",
          "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner focus-visible:transition-shadow focus-visible:duration-300 focus-visible:ease-[cubic-bezier(.25,.1,.25,1)]",
        )}
      >
        <span className="select-none text-views-today">
          <TodayIcon24 />
        </span>
        <span className="min-w-0 grow select-none truncate py-[3px] text-sm/[17px] text-base-primary">
          Today
        </span>
      </Link>
      <div className="grid h-6 w-6 shrink-0 place-items-center">
        <span
          className={classNames(
            "select-none text-xs/6",
            isOverdue ? "text-date-overdue-tint" : "text-count",
          )}
        >
          {incompleteTaskCount}
        </span>
      </div>
    </li>
  );
}
