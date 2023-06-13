import React from "react";
import { Link, useFetchers, useLoaderData, useParams } from "react-router-dom";
import { CheckboxDisplayMini } from "@components/checkboxes";
import { classNames } from "@utils";
import SiblingInfo from "./SiblingInfo";

export default function ParentInfo() {
  const fetchers = useFetchers();
  const { tasks } = useLoaderData();
  const { taskId } = useParams();

  const relevantFetcher = fetchers.find(
    (f) =>
      f.formData &&
      f.formData.get("id") === taskId &&
      f.formData.get("projectId")
  );
  const { parentId, projectId } = tasks.find((t) => t.id === taskId);

  // If formData has different projectId, task is moving to another project
  if (
    (relevantFetcher &&
      relevantFetcher.formData.get("projectId") !== projectId) ||
    !parentId
  ) {
    return null;
  }

  const { id, name, isCompleted, priority } = tasks.find(
    (t) => t.id === parentId
  );

  return (
    <div className="flex h-7">
      <Link
        to={`../task/${id}`}
        className={classNames(
          "relative flex min-w-[68px] items-center justify-center gap-1.5 rounded-l-[5px] border border-r-0 border-divider-secondary pl-1.5 pr-2 text-content-primary transition-colors duration-300",
          "after:absolute after:right-[-.5px] after:block after:h-3 after:w-px after:bg-divider-secondary",
          "hover:bg-quaternary-hover-fill hover:text-quaternary-hover-tint",
          "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint"
        )}
      >
        <CheckboxDisplayMini isCompleted={isCompleted} priority={priority} />
        <span className="select-none truncate font-reactist tracking-dark">
          {name}
        </span>
      </Link>
      <SiblingInfo />
    </div>
  );
}
