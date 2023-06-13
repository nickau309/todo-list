import React from "react";
import { useFetcher, useParams } from "react-router-dom";
import { DeleteIcon24 } from "@assets";
import { useConfirmDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function DeleteProject({ id, name }) {
  const fetcher = useFetcher();
  const { projectId } = useParams();

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
          { type: "deleteProject", shouldRedirect: projectId === id, id },
          { method: "post" }
        );
      },
      verb: "Delete",
      title: "Delete project?",
    });
  };

  return (
    <MenuItem as="button" onClick={openConfirmDialog}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <DeleteIcon24 />
        </span>
        <span className="text-sm/6">Delete project</span>
      </div>
    </MenuItem>
  );
}
