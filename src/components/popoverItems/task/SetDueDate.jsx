import React, { Fragment } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import {
  DisabledIcon24,
  MoreActionIcon28,
  NextWeekendIcon28,
  NextWeekIcon28,
  TodayIcon28,
  TomorrowIcon28,
} from "@/assets";
import { DueDateDropdown } from "@/components/dropdowns";
import { classNames } from "@/utils";

export default function SetDueDate({ close, id }) {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData();

  const { refs, floatingStyles } = useFloating({
    placement: "left",
    middleware: [shift()],
  });

  const { dueDate } = tasks.find((t) => t.id === id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="flex w-full flex-col gap-2 px-2.5 py-1 leading-6">
      <div className="font-reactist text-xs text-content-primary">Due date</div>
      <div className="flex gap-3 py-[5px]">
        {(!dueDate || dueDate.getTime() !== today.getTime()) && (
          <Popover.Button
            onClick={() => {
              fetcher.submit(
                { type: "updateTask", id, dueDate: today },
                { method: "post" },
              );
            }}
            className={classNames(
              "select-none rounded-[3px] text-date-today-fill",
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            <TodayIcon28 />
          </Popover.Button>
        )}
        {(!dueDate || dueDate.getTime() !== tomorrow.getTime()) && (
          <Popover.Button
            onClick={() => {
              fetcher.submit(
                { type: "updateTask", id, dueDate: tomorrow },
                { method: "post" },
              );
            }}
            className={classNames(
              "select-none rounded-[3px] text-date-tomorrow-fill",
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            <TomorrowIcon28 />
          </Popover.Button>
        )}
        {today.getDay() !== 5 && (
          <Popover.Button
            onClick={() => {
              const nextSaturday = new Date(today);
              nextSaturday.setDate(
                nextSaturday.getDate() +
                  ((13 - nextSaturday.getDay()) % 7 || 7),
              );
              fetcher.submit(
                { type: "updateTask", id, dueDate: nextSaturday },
                { method: "post" },
              );
            }}
            className={classNames(
              "select-none rounded-[3px] text-date-weekend-fill",
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            <NextWeekendIcon28 />
          </Popover.Button>
        )}
        {today.getDay() !== 0 && (
          <Popover.Button
            onClick={() => {
              const nextMonday = new Date(today);
              nextMonday.setDate(
                nextMonday.getDate() + ((8 - nextMonday.getDay()) % 7 || 7),
              );
              fetcher.submit(
                { type: "updateTask", id, dueDate: nextMonday },
                { method: "post" },
              );
            }}
            className={classNames(
              "select-none rounded-[3px] text-date-next-week-fill",
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            <NextWeekIcon28 />
          </Popover.Button>
        )}
        {dueDate && (
          <Popover.Button
            onClick={() => {
              fetcher.submit(
                { type: "updateTask", id, dueDate: null },
                { method: "post" },
              );
            }}
            className={classNames(
              "select-none rounded-[3px] text-content-secondary",
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            <DisabledIcon24 className="h-7 w-7" />
          </Popover.Button>
        )}
        <Popover as={Fragment}>
          <Popover.Button
            ref={refs.setReference}
            onClick={(e) => e.stopPropagation()}
            className={classNames(
              "select-none rounded-[3px] text-content-secondary",
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            <MoreActionIcon28 />
          </Popover.Button>
          <DueDateDropdown
            ref={refs.setFloating}
            focus
            unmount={false}
            dueDate={dueDate}
            setDueDate={(dueDate) => {
              fetcher.submit(
                { type: "updateTask", id, dueDate },
                { method: "post" },
              );
              close();
            }}
            onClick={(e) => e.stopPropagation()}
            style={floatingStyles}
          />
        </Popover>
      </div>
    </div>
  );
}
