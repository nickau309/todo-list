import React from "react";
import { useFetcher } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { DuplicateIcon24 } from "@/assets";
import { Button } from "./components";

export default function Duplicate({ id }) {
  const fetcher = useFetcher();

  return (
    <Popover.Button
      as={Button}
      onClick={() => {
        fetcher.submit({ type: "duplicateTask", id }, { method: "post" });
      }}
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <DuplicateIcon24 />
        </span>
        <span className="text-sm/6">Duplicate</span>
      </div>
    </Popover.Button>
  );
}
