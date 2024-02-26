import React from "react";
import { useFetcher, useFetchers, useLoaderData } from "react-router-dom";
import {
  CommandMenuDialog,
  KeyboardShortcutsDialog,
  ProjectDetailsDialog,
} from "@/components/dialogs";
import { useDialogControl, useDialogState } from "@/contexts/DialogContext";

export default function Dialogs() {
  const fetcher = useFetcher();
  const fetchers = useFetchers();
  const { projects } = useLoaderData();

  const { id, type, isOpen } = useDialogState();
  const { closeDialog, resetDialog } = useDialogControl();

  if (type === "AddProject") {
    return (
      <ProjectDetailsDialog
        afterLeave={resetDialog}
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          formData.append("type", "addProject");
          fetcher.submit(formData, { method: "post" });
          closeDialog();
        }}
        verb="Add"
        title="Add project"
      />
    );
  } else if (type === "AddProjectAbove") {
    return (
      <ProjectDetailsDialog
        afterLeave={resetDialog}
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          formData.append("type", "addProject");
          formData.append("nextId", id);
          fetcher.submit(formData, { method: "post" });
          closeDialog();
        }}
        verb="Add"
        title="Add project"
      />
    );
  } else if (type === "AddProjectBelow") {
    return (
      <ProjectDetailsDialog
        afterLeave={resetDialog}
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          formData.append("type", "addProject");
          formData.append("prevId", id);
          fetcher.submit(formData, { method: "post" });
          closeDialog();
        }}
        verb="Add"
        title="Add project"
      />
    );
  } else if (type === "CommandMenu") {
    return (
      <CommandMenuDialog
        afterLeave={resetDialog}
        isOpen={isOpen}
        onClose={closeDialog}
      />
    );
  } else if (type === "EditProject") {
    const project = projects.find((p) => p.id === id);

    const relevantFetcher = fetchers.find(
      (f) => f.formData && f.formData.get("id") === id,
    );

    return (
      <ProjectDetailsDialog
        afterLeave={resetDialog}
        defaultColor={relevantFetcher?.formData.get("color") ?? project.color}
        defaultIsFavorite={
          relevantFetcher
            ? relevantFetcher.formData.get("isFavorite") === "true"
            : project.isFavorite
        }
        defaultName={relevantFetcher?.formData.get("name") ?? project.name}
        defaultViewStyle={
          relevantFetcher?.formData.get("viewStyle") ?? project.viewStyle
        }
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          formData.append("type", "updateProject");
          formData.append("id", id);
          fetcher.submit(formData, { method: "post" });
          closeDialog();
        }}
        verb="Save"
        title="Edit project"
      />
    );
  } else if (type === "KeyboardShortcuts") {
    return (
      <KeyboardShortcutsDialog
        afterLeave={resetDialog}
        isOpen={isOpen}
        onClose={closeDialog}
      />
    );
  }

  return null;
}
