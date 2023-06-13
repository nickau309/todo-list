import React, { forwardRef, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useNodeHeight, useTextareaControl } from "@hooks";
import { classNames } from "@utils";

const EditDescription = forwardRef(function EditDescription(
  { editId, editType, ...attr },
  ref
) {
  const { tasks } = useLoaderData();

  const textareaRef = useRef();

  const { setHeight } = useNodeHeight(textareaRef, (13 * 165) / 100);
  useTextareaControl(ref, textareaRef);

  const defaultValue =
    editId && editType === "editTask"
      ? tasks.find((t) => t.id === editId).description
      : "";

  return (
    <textarea
      ref={textareaRef}
      name="description"
      defaultValue={defaultValue}
      onChange={setHeight}
      placeholder="Description"
      className={classNames(
        "box-content resize-none overflow-hidden bg-inherit p-px pl-0 text-[13px]/[1.65] tracking-dark",
        "placeholder:select-none placeholder:text-field-placeholder focus-visible:outline-none"
      )}
      {...attr}
    ></textarea>
  );
});

export default EditDescription;
