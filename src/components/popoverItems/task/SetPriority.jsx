import React from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { Priority4Icon24, PriorityIcon24 } from "@/assets";
import { classNames, priorityTextColor as textColor } from "@/utils";

export default function SetPriority({ id }) {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData();

  const { priority } = tasks.find((t) => t.id === id);

  return (
    <div className="flex w-full flex-col gap-2 px-2.5 py-1 leading-6">
      <div className="font-reactist text-xs text-content-primary">Priority</div>
      <div className="flex h-[29px] items-center gap-4">
        {new Array(4).fill(null).map((_, i) => (
          <Popover.Button
            key={i}
            onClick={() => {
              fetcher.submit(
                { type: "updateTask", id, priority: i + 1 },
                { method: "post" },
              );
            }}
            className={classNames(
              "select-none rounded-[3px] border",
              priority === i + 1 ? "border-base-primary" : "border-transparent",
              "p-px",
              textColor[i + 1],
              "hover:bg-menu-item-secondary-hover focus-visible:bg-menu-item-secondary-hover focus-visible:outline-none",
            )}
          >
            {i + 1 === 4 ? <Priority4Icon24 /> : <PriorityIcon24 />}
          </Popover.Button>
        ))}
      </div>
    </div>
  );
}
