import React from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { CheckboxInput } from "@/components/checkboxes";
import { useEditorState } from "@/contexts";
import { classNames } from "@/utils";
import { ItemInfoTags, ItemLeftAction, ItemRightAction } from "../components";

export default function ReorderItemDetail({
  controls,
  id,
  isDragging,
  isInTaskPanel,
}) {
  const { tasks } = useLoaderData();
  const navigate = useNavigate();
  const { projects } = useRouteLoaderData("root");

  const { editId, editType, isEditorOpen } = useEditorState();

  const { name, description, isCompleted, projectId, childIds, isCollapsed } =
    tasks.find((t) => t.id === id);

  const path = `/project/${projectId}/task/${id}`;

  const { isArchived } = projects.find((p) => p.id === projectId);

  const isEditing = editId === id && editType === "editTask" && isEditorOpen;

  if (isEditing) {
    return null;
  }

  return (
    <div className="group relative">
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
          "flex rounded-[5px]",
          isInTaskPanel ? "pr-[60px]" : "pr-[30px]",
          "group-focus-within:-ml-2.5 group-focus-within:w-[calc(100%+10px)] group-focus-within:bg-task-button group-focus-within:pl-2.5 group-focus-within:outline-none group-focus-within:ring-1 group-focus-within:ring-inset group-focus-within:ring-task-button",
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
                  : "text-content-primary",
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
            isDragging && "opacity-0",
            "group-focus-within:pr-[13px]",
          )}
        >
          <ItemLeftAction
            controls={controls}
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
          isDragging && "opacity-0",
          isInTaskPanel
            ? "top-1.5 group-focus-within:focus-within:[&:not(:group-hover)]:bg-fade-panel"
            : "top-2 -mr-[30px] group-focus-within:focus-within:[&:not(:group-hover)]:bg-fade",
        )}
      >
        <ItemRightAction
          id={id}
          isArchived={isArchived}
          isCompleted={isCompleted}
          name={name}
        />
      </div>
    </div>
  );
}
