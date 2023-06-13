import React from "react";
import ItemCommentButton from "./ItemCommentButton";
import ItemDueDateButton from "./ItemDueDateButton";
import ItemEditButton from "./ItemEditButton";
import ItemMenu from "./ItemMenu";

export default function ItemRightAction({ id, isArchived, isCompleted, name }) {
  return (
    <div className="group/action flex gap-2 pl-6">
      {!isArchived && !isCompleted && (
        <>
          <ItemEditButton id={id} />
          <ItemDueDateButton id={id} />
        </>
      )}
      <ItemCommentButton />
      <ItemMenu
        id={id}
        isArchived={isArchived}
        isCompleted={isCompleted}
        name={name}
      />
    </div>
  );
}
