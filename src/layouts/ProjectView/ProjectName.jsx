import React, { useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { classNames } from "@/utils";

export default function ProjectName({ childOrder, name: defaultName }) {
  const fetcher = useFetcher();
  const { projectId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(defaultName);

  const correctName = fetcher.formData?.get("name").trim() ?? defaultName;
  if (!isEditing && name !== correctName) {
    setName(correctName);
    return;
  }

  const closeEditor = () => {
    setIsEditing(false);
  };

  if (!childOrder) {
    return (
      <div className="line-clamp-2 break-words text-xl/tight font-bold text-base-primary">
        {name}
      </div>
    );
  } else if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          formData.append("type", "updateProject");
          formData.append("id", projectId);
          fetcher.submit(formData, { method: "post" });
          closeEditor();
        }}
        className="relative flex min-w-0 grow flex-col gap-2.5"
      >
        {name.length >= 110 && (
          <div className="absolute -top-7 right-0 text-sm/[18.4px] text-priority-1">
            Character limit: {name.length}/120
          </div>
        )}
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeEditor();
            }
          }}
          maxLength="120"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className={classNames(
            "mt-[-4px] text-ellipsis rounded-[5px] border border-[#ddd] bg-inherit px-2 pb-[5px] pt-[3px] text-xl/tight font-bold text-base-input",
            "focus-visible:border-charcoal focus-visible:outline-none",
          )}
        />
        <div className="flex items-center gap-3">
          <SubmitButton
            disabled={/^\s*$/.test(name)}
            className="min-w-[68px] px-3 transition-colors duration-300"
          >
            <span className="leading-8">Save</span>
          </SubmitButton>
          <CancelButton
            onClick={closeEditor}
            className="min-w-[68px] px-3 transition-colors duration-300"
          >
            <span className="leading-8">Cancel</span>
          </CancelButton>
        </div>
      </form>
    );
  } else {
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={() => setIsEditing(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setIsEditing(true);
          }
        }}
        className="-ml-1 -mt-0.5 line-clamp-2 cursor-text break-words rounded-[5px] px-1 py-0.5 text-xl/tight font-bold text-base-primary hover:bg-base-primary-hover"
      >
        {name}
      </div>
    );
  }
}
