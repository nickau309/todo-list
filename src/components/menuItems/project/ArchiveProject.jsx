import React from "react";
import { useFetcher, useParams } from "react-router-dom";
import { ArchiveIconOutline24 } from "@assets";
import { useConfirmDialogControl } from "@contexts";
import { MenuItem } from "./components";

export default function ArchiveProject({ id, name }) {
  const fetcher = useFetcher();
  const { projectId } = useParams();

  const { openDialog } = useConfirmDialogControl();

  const openConfirmDialog = () => {
    openDialog({
      description: (
        <>
          Are you sure you want to archive <strong>{name}</strong>?
        </>
      ),
      handleSubmit: (e) => {
        e.preventDefault();
        fetcher.submit(
          {
            type: "updateProject",
            shouldRedirect: projectId === id,
            id,
            isArchived: "true",
          },
          { method: "post" }
        );
      },
      verb: "Archive",
      title: "Archive project?",
    });
  };

  return (
    <MenuItem as="button" onClick={openConfirmDialog}>
      <div className="flex gap-2.5">
        <span className="text-content-secondary">
          <ArchiveIconOutline24 />
        </span>
        <span className="text-sm/6">Archive project</span>
      </div>
    </MenuItem>
  );
}
