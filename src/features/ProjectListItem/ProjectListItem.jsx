import React from "react";
import { Link, useFetchers } from "react-router-dom";
import { ProjectIcon24 } from "@/assets";
import { classNames, textColor } from "@/utils";
import ProjectListItemMenu from "./ProjectListItemMenu";

export default function ProjectListItem({ color, id, isArchived, name }) {
  const fetchers = useFetchers();

  const relevantFetcher = fetchers.find(
    (f) => f.formData && f.formData.get("id") === id,
  );

  const displayColor = relevantFetcher?.formData.get("color") ?? color;
  const displayName = relevantFetcher?.formData.get("name") ?? name;

  return (
    <li
      className={classNames(
        "group relative",
        "[&:focus-within+li>a]:border-transparent [&:hover+li>a]:border-transparent [&:not(:first-child)>a]:border-t",
      )}
    >
      <Link
        to={`/project/${id}`}
        className={classNames(
          "box-content flex h-[27.2px] items-center gap-2 border-divider-tertiary p-3",
          "group-hover:rounded-[10px] group-hover:border-transparent group-hover:bg-quaternary-hover-fill",
          "group-focus-within:rounded-[10px] group-focus-within:border-transparent group-focus-within:bg-quaternary-hover-fill",
        )}
      >
        <span className={textColor[displayColor]}>
          <ProjectIcon24 />
        </span>
        <span className="truncate font-reactist text-sm/[18.4px] font-bold text-content-primary">
          {displayName}
        </span>
      </Link>
      <div className="absolute -right-9 left-full top-0 flex h-full min-w-[36px] items-center justify-end">
        <ProjectListItemMenu
          id={id}
          isArchived={isArchived}
          name={displayName}
        />
      </div>
    </li>
  );
}
