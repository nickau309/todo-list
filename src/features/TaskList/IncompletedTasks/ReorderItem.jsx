import React, { useEffect, useRef, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { useWidth } from "@contexts/WidthContext";
import { classNames } from "@utils";
import AddTaskAbove from "./AddTaskAbove";
import AddTaskBelow from "./AddTaskBelow";
import EditTask from "./EditTask";
import ReorderItemDetail from "./ReorderItemDetail";

export default function ReorderItem({
  itemId,
  isDragging,
  setDraggingId,
  displayDepth,
  minDepth,
  maxDepth,
  appendTask,
  isInTaskPanel,
}) {
  const itemRef = useRef();
  const [dragDepth, setDragDepth] = useState(displayDepth);

  const controls = useDragControls();

  const width = useWidth();

  useEffect(() => {
    if (isDragging) {
      const item = itemRef.current;
      const placeholder = item.nextElementSibling;
      placeholder.style.height = item.scrollHeight + "px";
    }
  }, [isDragging, width]);

  const dividerClassName = classNames(
    "border-b",
    isInTaskPanel ? "border-divider-secondary" : "border-divider-base"
  );

  const displayWidth = {
    marginLeft: displayDepth * 28 + "px",
    width: "calc(100% - " + displayDepth * 28 + "px)",
  };

  const dragWidth = {
    marginLeft: dragDepth * 28 + "px",
    width: "calc(100% - " + dragDepth * 28 + "px)",
  };

  return (
    <>
      <AddTaskAbove
        id={itemId}
        className={dividerClassName}
        style={dragWidth}
      />
      <Reorder.Item
        value={itemId}
        drag
        dragTransition={{
          bounceStiffness: 1e5,
          bounceDamping: 1e5,
        }}
        dragControls={controls}
        dragListener={false}
        onDrag={(_, info) => {
          const targetDragDepth = displayDepth + Math.floor(info.offset.x / 28);
          if (targetDragDepth >= maxDepth) {
            setDragDepth(maxDepth);
          } else if (targetDragDepth <= minDepth) {
            setDragDepth(minDepth);
          } else {
            setDragDepth(targetDragDepth);
          }
        }}
        onDragStart={() => {
          setDraggingId(itemId);
          setDragDepth(displayDepth);
        }}
        onDragEnd={() => {
          setDraggingId(null);
          appendTask(dragDepth);
        }}
        transition={{ duration: 0 }}
        ref={itemRef}
        className={classNames(
          "rounded-[3px]",
          dividerClassName,
          isDragging ? "absolute bg-drag shadow-drag" : "bg-base-primary"
        )}
        style={displayWidth}
      >
        <EditTask id={itemId} />
        <ReorderItemDetail
          id={itemId}
          isDragging={isDragging}
          isInTaskPanel={isInTaskPanel}
          controls={controls}
        />
      </Reorder.Item>
      {isDragging && (
        <li
          className="box-content rounded-[3px] border-b border-transparent bg-drag-placeholder-primary"
          style={dragWidth}
        ></li>
      )}
      <AddTaskBelow
        id={itemId}
        className={dividerClassName}
        style={dragWidth}
      />
    </>
  );
}
