import React, { forwardRef, useRef } from "react";
import { useNodeHeight, useTextareaControl } from "@/hooks";
import { classNames } from "@/utils";

const EditName = forwardRef(function EditName(
  { isInDialog, onChange, ...attr },
  ref,
) {
  const textareaRef = useRef();

  const { setHeight } = useNodeHeight(
    textareaRef,
    isInDialog ? 25 : (14 * 165) / 100,
  );
  useTextareaControl(ref, textareaRef);

  return (
    <textarea
      ref={textareaRef}
      name="name"
      onChange={(e) => {
        e.target.value = e.target.value.replaceAll(/[^\S ]/g, "");
        setHeight();
        onChange(e);
      }}
      placeholder="Task name"
      className={classNames(
        "resize-none overflow-hidden bg-inherit",
        isInDialog ? "text-xl/tight" : "text-sm/[1.65]",
        "font-semibold tracking-dark",
        "placeholder:select-none placeholder:text-field-placeholder",
        "focus-visible:outline-none",
      )}
      {...attr}
    ></textarea>
  );
});

export default EditName;
