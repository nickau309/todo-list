import React, { Fragment, useEffect, useId, useRef, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { DescriptionIcon24 } from "@assets";
import { CancelButton, SubmitButton } from "@components/buttons";
import { CheckboxInput } from "@components/checkboxes";
import { classNames } from "@utils";
import EditDescription from "./EditDescription";
import EditName from "./EditName";

export default function Info({
  description,
  isArchived,
  isCompleted,
  isEditing,
  name: defaultName,
  setIsEditing,
}) {
  const whiteSpaceOnlyReg = /^\s*$/;

  const fetcher = useFetcher();
  const { taskId } = useParams();

  const descTextareaId = useId();
  const prevFocusName = useRef();
  const textareaRef = useRef(new Map());
  const [name, setName] = useState(defaultName);
  const isSubmitDisabled = whiteSpaceOnlyReg.test(name) || name.length > 500;
  const [isDescriptionBlank, setIsDescriptionBlank] = useState(
    whiteSpaceOnlyReg.test(description)
  );

  const focusTo = (name) => {
    const node = textareaRef.current.get(name);
    if (node) {
      node.focus();
    }
  };

  useEffect(() => {
    if (isEditing) {
      focusTo(prevFocusName.current);
    }
  }, [isEditing]);

  const focusToTextarea = (e) => {
    if (e.target === e.currentTarget) {
      focusTo(prevFocusName.current);
    }
  };

  const setPrevFocusName = (e) => {
    prevFocusName.current = e.target.name;
  };

  const editName = () => {
    prevFocusName.current = "name";
    setIsEditing(true);
  };

  const editDescription = () => {
    prevFocusName.current = "description";
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(
      e.currentTarget instanceof HTMLFormElement
        ? e.currentTarget
        : e.currentTarget.form
    );
    formData.append("type", "updateTask");
    formData.append("id", taskId);
    fetcher.submit(formData, { method: "post" });
    setIsEditing(false);
  };

  const descToDisplay = fetcher.formData?.get("description") ?? description;
  const descArr = descToDisplay.split("\n");

  return (
    <div className="flex">
      <div className="pt-[7px]">
        <CheckboxInput
          taskId={taskId}
          disabled={isArchived || isEditing}
          className={classNames(
            "transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
            "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
          )}
        />
      </div>
      {isEditing ? (
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex grow flex-col gap-2 text-content-primary"
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            onClick={focusToTextarea}
            className="ml-[3px] box-content flex min-h-[99px] cursor-text flex-col gap-2.5 rounded-[10px] border border-divider-secondary px-[7px] pb-2.5 pt-1 focus-within:border-divider-primary"
          >
            <EditName
              ref={(node) => {
                if (node) {
                  textareaRef.current.set("name", node);
                } else {
                  textareaRef.current.delete("name");
                }
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={setPrevFocusName}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitDisabled) {
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex pt-1.5">
              {isDescriptionBlank && (
                <label
                  htmlFor={descTextareaId}
                  className="-ml-[3px] text-content-secondary"
                >
                  <DescriptionIcon24 />
                </label>
              )}
              <EditDescription
                ref={(node) => {
                  if (node) {
                    textareaRef.current.set("description", node);
                  } else {
                    textareaRef.current.delete("description");
                  }
                }}
                defaultValue={description}
                id={descTextareaId}
                isDescriptionBlank={isDescriptionBlank}
                onChange={(e) => {
                  setIsDescriptionBlank(whiteSpaceOnlyReg.test(e.target.value));
                }}
                onFocus={setPrevFocusName}
              />
            </div>
            {name.length > 500 && (
              <div className="text-xs text-[#dc4c3e]">
                Task name character limit: {name.length} / 500
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <CancelButton
              onClick={() => setIsEditing(false)}
              className={classNames(
                "min-w-[68px] px-3 transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
              )}
            >
              <span className="leading-8">Cancel</span>
            </CancelButton>
            <SubmitButton
              disabled={isSubmitDisabled}
              className={classNames(
                "min-w-[68px] px-3 transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
              )}
            >
              <span className="leading-8">Save</span>
            </SubmitButton>
          </div>
        </form>
      ) : (
        <div className="ml-2 flex min-w-0 grow flex-col pt-[5px] text-content-primary">
          <button
            type="button"
            onClick={editName}
            disabled={isArchived || isCompleted}
            className={classNames(
              "ml-[3px] mr-[5px] cursor-text break-words rounded-[3px] text-left text-xl/tight font-semibold tracking-dark",
              isCompleted && "line-through decoration-content-secondary",
              "transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
            )}
          >
            {fetcher.formData?.get("name") ?? defaultName}
          </button>
          <button
            type="button"
            onClick={editDescription}
            disabled={isArchived || isCompleted}
            className={classNames(
              "text-truncate mr-[5px] mt-4",
              descToDisplay === "" ? "mb-1" : "mb-[18px]",
              "cursor-text break-words rounded-[3px] pl-[3px] text-left leading-[1.65] tracking-dark",
              "transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
              "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
            )}
          >
            {descToDisplay === "" ? (
              <div className="flex items-center gap-px pt-[1.5px] text-content-secondary">
                <span>
                  <DescriptionIcon24 />
                </span>
                <span>Description</span>
              </div>
            ) : (
              descArr.map((v, i) => (
                <Fragment key={i}>
                  {v}
                  {i !== descArr.length && <br />}
                </Fragment>
              ))
            )}
          </button>
        </div>
      )}
    </div>
  );
}
