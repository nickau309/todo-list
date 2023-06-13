import React from "react";
import { useParams } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { LinkIcon24 } from "@assets";
import { Button } from "./components";

export default function CopyLinkToTask({ id }) {
  const { projectId } = useParams();

  return (
    <Popover.Button
      as={Button}
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/todo-list/project/${projectId}/task/${id}`
        );
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <LinkIcon24 />
        </span>
        <span className="text-sm/6">Copy link to task</span>
      </div>
    </Popover.Button>
  );
}
