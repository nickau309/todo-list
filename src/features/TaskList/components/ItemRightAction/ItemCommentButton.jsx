import React from "react";
import { CommentIcon24 } from "@assets";
import { useErrorDialogControl } from "@contexts";
import { classNames } from "@utils";

export default function ItemCommentButton() {
  const { openDialog } = useErrorDialogControl();

  return (
    <button
      type="button"
      onClick={() => {
        openDialog({
          maxWidth: "max-w-[450px]",
          title: "Comment on item",
        });
      }}
      aria-label="Comment"
      className={classNames(
        "hidden aspect-square w-6 place-items-center rounded-[3px] text-content-secondary opacity-0",
        "hover:bg-base-secondary-hover hover:text-base-primary",
        "focus-visible:bg-base-secondary-hover focus-visible:text-base-primary",
        "group-focus-within/action:opacity-100 group-hover:opacity-100",
        "min-[810px]:grid"
      )}
    >
      <CommentIcon24 />
    </button>
  );
}
