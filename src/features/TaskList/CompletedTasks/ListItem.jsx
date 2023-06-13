import React from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { CheckboxInput } from "@components/checkboxes";
import { classNames } from "@utils";
import { ItemInfoTags, ItemLeftAction, ItemRightAction } from "../components";

export default function TaskListItem({ displayDepth, id, isInTaskPanel }) {
  const { tasks } = useLoaderData();
  const navigate = useNavigate();
  const { projects } = useRouteLoaderData("root");

  const { name, description, isCompleted, projectId, childIds, isCollapsed } =
    tasks.find((t) => t.id === id);

  const path = `/project/${projectId}/task/${id}`;

  const { isArchived } = projects.find((p) => p.id === projectId);

  return (
    <li
      className={classNames(
        "group relative rounded-[3px] border-b",
        isInTaskPanel ? "border-divider-secondary" : "border-divider-base",
        "bg-base-primary"
      )}
      style={{
        marginLeft: displayDepth * 28 + "px",
        width: "calc(100% - " + displayDepth * 28 + "px)",
      }}
    >
      <div
        role="button"
        tabIndex="0"
        onClick={() => navigate(path)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(path);
          }
        }}
        className={classNames(
          "peer flex rounded-[5px]",
          isInTaskPanel ? "pr-[60px]" : "pr-[30px]",
          "focus-within:-ml-2.5 focus-within:w-[calc(100%+10px)] focus-within:bg-task-button focus-within:pl-2.5 focus-within:outline-none focus-within:ring-1 focus-within:ring-inset focus-within:ring-task-button"
        )}
      >
        <div className="-ml-[3px] mr-1.5 mt-2">
          <CheckboxInput taskId={id} disabled={isArchived} />
        </div>
        <div className="min-w-0 grow py-2">
          <div className="mb-[3px] flex flex-col items-start gap-1">
            <div
              className={classNames(
                "line-clamp-4 w-full break-words pb-0.5 text-sm/normal tracking-dark",
                isCompleted
                  ? "text-charcoal line-through"
                  : "text-content-primary"
              )}
            >
              {name}
            </div>
            {description && (
              <div className="w-full truncate pb-0.5 text-xs/normal tracking-dark text-content-secondary">
                {description}
              </div>
            )}
          </div>
          <ItemInfoTags id={id} isArchived={isArchived} />
        </div>
      </div>
      {!isArchived && (
        <div
          className={classNames(
            "absolute right-full top-[7px] pr-[3px]",
            "peer-focus-within:pr-[13px]"
          )}
        >
          <ItemLeftAction
            id={id}
            isCollapsed={isCollapsed}
            isCompleted={isCompleted}
            showCollapseButton={!isInTaskPanel && childIds.length > 0}
          />
        </div>
      )}
      <div
        className={classNames(
          "absolute right-0",
          isInTaskPanel
            ? "top-1.5 group-hover:bg-fade-panel"
            : "top-2 -mr-[30px] group-hover:bg-fade"
        )}
      >
        <ItemRightAction
          id={id}
          isArchived={isArchived}
          isCompleted={isCompleted}
          name={name}
        />
      </div>
    </li>
  );
}
