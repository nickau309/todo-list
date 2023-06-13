import React from "react";
import { EditIcon24 } from "@assets";
import { useEditorControl } from "@contexts";
import { classNames } from "@utils";

export default function ItemEditButton({ id }) {
  const { openEditor } = useEditorControl();

  return (
    <button
      type="button"
      onClick={() => openEditor("editTask", id)}
      aria-label="Edit"
      className={classNames(
        "grid aspect-square w-6 place-items-center rounded-[3px] text-content-secondary opacity-0",
        "hover:bg-base-secondary-hover hover:text-base-primary",
        "focus-visible:bg-base-secondary-hover focus-visible:text-base-primary",
        "group-focus-within/action:opacity-100 group-hover:opacity-100"
      )}
    >
      <EditIcon24 />
    </button>
  );
}
