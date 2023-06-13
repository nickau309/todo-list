import React from "react";
import { useFetcher } from "react-router-dom";
import { DeleteIcon24 } from "@assets";
import { useConfirmDialogControl } from "@contexts";
import { MenuItem } from "./components";

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
        fetcher.submit(
          { type: "deleteTask", shouldRedirect: true, id },
          { method: "post" }
        );
      },
      verb: "Delete",
      title: "Delete task?",
    });
  };

  return (
    <MenuItem as="button" onClick={openConfirmDialog}>
      <div className="flex items-center gap-2.5">
        <span className="text-content-secondary">
          <DeleteIcon24 />
        </span>
        <span className="text-[13px]/[16.8px]">Delete task…</span>
      </div>
    </MenuItem>
  );
}
