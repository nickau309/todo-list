import React from "react";
import { useFetcher } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { DeleteIcon24 } from "@assets";
import { useConfirmDialogControl } from "@contexts";
import { Button } from "./components";

export default function DeleteTask({ id, name }) {
  const fetcher = useFetcher();

  const { openDialog } = useConfirmDialogControl();

  const openConfirmDialog = () => {
    openDialog({
      description: (
        <>
          Are you sure you want to delete <strong>{name}</strong>?
        </>
      ),
      handleSubmit: (e) => {
        e.preventDefault();
        fetcher.submit({ type: "deleteTask", id }, { method: "post" });
      },
      verb: "Delete",
      title: "Delete task?",
    });
  };

  return (
    <Popover.Button
      as={Button}
      onClick={openConfirmDialog}
      className="group/delete"
    >
      <div className="flex gap-2.5">
        <span className="text-content-secondary group-hover/delete:text-[#de4c4a]">
          <DeleteIcon24 />
        </span>
        <span className="text-sm/6 group-hover/delete:text-[#de4c4a]">
          Delete task
        </span>
      </div>
    </Popover.Button>
  );
}
