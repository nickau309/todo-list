import React, { forwardRef, useRef } from "react";
import { useNodeHeight, useTextareaControl } from "@hooks";
import { classNames } from "@utils";

const EditName = forwardRef(function EditName(
  { defaultValue, onChange, ...attr },
  ref
) {
  const textareaRef = useRef();

  const { setHeight } = useNodeHeight(textareaRef, 25);
  useTextareaControl(ref, textareaRef);

  return (
    <textarea
      ref={textareaRef}
      name="name"
      defaultValue={defaultValue}
      onChange={(e) => {
        e.target.value = e.target.value.replaceAll(/[^\S ]/g, "");
        setHeight();
        onChange(e);
      }}
      placeholder="Task name"
      className={classNames(
        "resize-none items-center overflow-hidden bg-inherit text-xl/tight font-semibold tracking-dark",
        "placeholder:select-none placeholder:text-field-placeholder focus-visible:outline-none"
      )}
      {...attr}
    ></textarea>
  );
});

export default EditName;
