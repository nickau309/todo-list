"use client";

import { InboxIcon16, NumberSignIcon16 } from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import { useProjects } from "@/contexts/projects-context";
import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { useOptimisticTask } from "../contexts/optimistic-task-context";

export default function Title() {
  const projects = useProjects();

  const { projectId } = useOptimisticTask();

  const project =
    projects.find((project) => project.id === projectId) ?? projects[0];

  const href: Route = project.isInboxProject
    ? "/app/inbox"
    : `/app/project/${project.id}`;

  return (
    <Link
      href={href}
      aria-disabled="false"
      className={clsx(
        "group flex h-7 min-w-[68px] select-none items-center justify-center gap-0.5 rounded-[5px] border border-transparent pl-0.5 pr-2",
        "text-actionable-quaternary-idle-tint",
        "transition-colors duration-300",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-actionable-quaternary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
    >
      {project.isInboxProject ? (
        <span>
          <InboxIcon16 />
        </span>
      ) : (
        <span
          className={clsx(
            textColor[project.color],
            "group-aria-disabled:opacity-60",
          )}
        >
          <NumberSignIcon16 />
        </span>
      )}
      <Text
        overflow="truncate"
        font="reactist"
        size="13px"
        weight={600}
        height="20px"
        spacing="-.15px"
      >
        {project.name}
      </Text>
    </Link>
  );
}
