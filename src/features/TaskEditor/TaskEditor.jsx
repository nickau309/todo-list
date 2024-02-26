import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CloseIcon24, SubmitIcon24 } from "@/assets";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { classNames } from "@/utils";
import ChooseDueDate from "./ChooseDueDate";
import ChooseLabels from "./ChooseLabels";
import ChoosePriority from "./ChoosePriority";
import ChooseProject from "./ChooseProject";
import ChooseReminders from "./ChooseReminders";
import EditDescription from "./EditDescription";
import EditName from "./EditName";
import MoreAction from "./MoreAction";

export default function TaskEditor({
  editId = null,
  editType,
  isInDialog = false,
  onClose,
  onSubmit,
  verb,
}) {
  const { tasks = null } = useLoaderData();

  const prevFocusName = useRef("name");
  const textareaRef = useRef(new Map());
  const [name, setName] = useState(() => {
    if (editType === "editTask") {
      return tasks.find((t) => t.id === editId).name;
    } else {
      return "";
    }
  });

  const focusTo = (name) => {
    const node = textareaRef.current.get(name);
    if (node) {
      node.focus();
    }
  };

  useEffect(() => {
    focusTo(prevFocusName.current);
  }, []);

  const focusToTextarea = (e) => {
    if (e.target === e.currentTarget) {
      focusTo(prevFocusName.current);
    }
  };

  const setPrevFocusName = (e) => {
    prevFocusName.current = e.target.name;
  };

  const whiteSpaceOnlyReg = /^\s*$/;
  const isSubmitDisabled = whiteSpaceOnlyReg.test(name) || name.length > 500;

  return (
    <form
      onSubmit={onSubmit}
      className={classNames("flex flex-col", !isInDialog && "gap-3")}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        onClick={focusToTextarea}
        className={classNames(
          "flex cursor-text flex-col gap-2.5",
          isInDialog ? "p-4" : "p-2.5 pb-0",
        )}
      >
        <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
          <div
            className={classNames(
              "flex flex-col",
              isInDialog ? "gap-[5px] pb-[7px]" : "gap-0.5 pb-0.5",
            )}
          >
            <EditName
              ref={(node) => {
                if (node) {
                  textareaRef.current.set("name", node);
                } else {
                  textareaRef.current.delete("name");
                }
              }}
              isInDialog={isInDialog}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={setPrevFocusName}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitDisabled) {
                  onSubmit(e);
                }
              }}
            />
            <EditDescription
              ref={(node) => {
                if (node) {
                  textareaRef.current.set("description", node);
                } else {
                  textareaRef.current.delete("description");
                }
              }}
              editId={editId}
              editType={editType}
              onFocus={setPrevFocusName}
            />
          </div>
        </div>
        {name.length > 500 && (
          <div className="text-xs text-[#dc4c3e]">
            Task name character limit: {name.length} / 500
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <ChooseDueDate editId={editId} editType={editType} />
          <ChoosePriority editId={editId} editType={editType} />
          <ChooseReminders />
          <ChooseLabels editId={editId} editType={editType} />
          <MoreAction />
        </div>
      </div>
      <div
        className={classNames(
          "flex justify-between gap-2 border-t border-divider-secondary",
          isInDialog ? "p-4" : "p-2 pr-3",
        )}
      >
        <ChooseProject editId={editId} editType={editType} />
        <div className="flex shrink-0 gap-2">
          <CancelButton
            onClick={onClose}
            className={classNames(
              "transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "max-[751px]:w-8 min-[751px]:min-w-[68px] min-[751px]:px-3",
            )}
          >
            <span className="leading-8 max-[751px]:hidden">Cancel</span>
            <span className="text-content-secondary min-[751px]:hidden">
              <CloseIcon24 />
            </span>
          </CancelButton>
          <SubmitButton
            disabled={isSubmitDisabled}
            className={classNames(
              "transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
              "max-[751px]:w-8 min-[751px]:min-w-[68px] min-[751px]:px-3",
            )}
          >
            <span className="leading-8 max-[751px]:hidden">{verb}</span>
            <span className="min-[751px]:hidden">
              <SubmitIcon24 />
            </span>
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
