import React, { forwardRef, useRef } from "react";
import { useNodeHeight, useTextareaControl } from "@/hooks";
import { classNames } from "@/utils";

const EditDescription = forwardRef(function EditDescription(
  { defaultValue, id, isDescriptionBlank, onChange, ...attr },
  ref,
) {
  const textareaRef = useRef();

  const { setHeight } = useNodeHeight(textareaRef, (14 * 165) / 100);
  useTextareaControl(ref, textareaRef);

  return (
    <textarea
      ref={textareaRef}
      id={id}
      name="description"
      defaultValue={defaultValue}
      onChange={(e) => {
        setHeight();
        onChange(e);
      }}
      placeholder="Description"
      className={classNames(
        "box-content grow resize-none overflow-hidden bg-inherit pb-px pr-px",
        isDescriptionBlank && "pt-[1.5px]",
        "leading-[1.65] tracking-dark",
        "placeholder:text-field-placeholder focus-visible:outline-none",
      )}
      {...attr}
    ></textarea>
  );
});

export default EditDescription;
