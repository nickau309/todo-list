"use client";

import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";
import { useOptimisticTask } from "../../contexts/optimistic-task-context";
import AddCommentsViaEmail from "./add-comments-via-email";
import AddExtension from "./add-extension";
import AddedOnDate from "./added-on-date";
import CopyLinkToTask from "./copy-link-to-task";
import Delete from "./delete";
import Duplicate from "./duplicate";
import { useMoreActionMenu } from "./more-action-menu";
import Print from "./print";
import ViewTaskActivity from "./view-task-activity";

export default function MoreActionMenuPanel() {
  const {
    project: { isArchived },
  } = useOptimisticTask();

  const {
    isOpen,
    elementsRef,
    labelsRef,
    context,
    floatingStyles,
    refs,
    getFloatingProps,
  } = useMoreActionMenu("MoreActionMenuItems");

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      {isOpen && (
        <FloatingPortal id="root">
          <FloatingOverlay lockScroll className="z-40" />
          <FloatingFocusManager context={context} visuallyHiddenDismiss>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={clsx(
                "z-40 box-content flex min-w-[280px] max-w-[300px] overflow-hidden rounded-[10px] border border-divider-primary",
                "bg-background-raised-primary text-display-primary-idle-tint shadow-[0_0_8px_rgba(0,0,0,.12)]",
                "focus-visible:outline-none",
              )}
              {...getFloatingProps()}
            >
              <div className="flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden py-1.5">
                <AddedOnDate />
                <hr className="my-1.5 h-px shrink-0 border-0 bg-divider-primary" />
                {!isArchived && <Duplicate />}
                <CopyLinkToTask />
                {!isArchived && (
                  <>
                    <AddCommentsViaEmail />
                    <ViewTaskActivity />
                  </>
                )}
                <Print />
                {!isArchived && (
                  <>
                    <hr className="my-1.5 h-px shrink-0 border-0 bg-divider-primary" />
                    <AddExtension />
                    <hr className="my-1.5 h-px shrink-0 border-0 bg-divider-primary" />
                    <Delete />
                  </>
                )}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </FloatingList>
  );
}
